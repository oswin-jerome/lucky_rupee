// UploadRupeePage.jsx
"use client";
import { createRupee } from "@/actions/rupees";
import { DB_ID, account, database, storage } from "@/utils/appWrite";
import { FilesetResolver, ObjectDetector } from "@mediapipe/tasks-vision";
import { Button, Heading, Text, TextField } from "@radix-ui/themes";
import { ID } from "appwrite";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";

const UploadRupeePage = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState({ $id: "" });
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgUrl(e.target?.result?.toString() ?? "");
    };
    if (image) reader.readAsDataURL(image as File);
  }, [image]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await createRupee({
      image: uploadImage.$id,
      serialNumber,
    });
    setLoading(false);
  };

  /**
   *
   * @param serial
   * @returns {boolean}
   */
  const isSerialHasDate = (serial: string) => {
    return false;
  };

  const detectSerialNumber = async () => {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm");
    const objectDetector = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `/model.tflite`,
        delegate: "GPU",
      },
      runningMode: "IMAGE",
      maxResults: 2,
    });

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
    const context2 = canvas2.getContext("2d");
    const detections = await objectDetector.detect(canvas);

    detections.detections.sort((a, b) => {
      return a.categories.find((e) => e.categoryName == "serial")?.score ?? 0 > (b.categories.find((e) => e.categoryName == "serial")?.score ?? 0) ? 1 : -1;
    });

    const detection = detections.detections[0];

    context?.beginPath();
    if (context) {
      context.lineWidth = 2;
      context.strokeStyle = "red";
      context.fillStyle = "red";
      context.font = "20px Arial";
    }
    context?.rect(detection.boundingBox!.originX - 5, detection.boundingBox!.originY, detection.boundingBox!.width + 5, detection.boundingBox!.height + 5);
    context?.fillText(detection.categories.sort((a, b) => (a.score > b.score ? 1 : -1))[0].score.toString(), detection.boundingBox!.originX, detection.boundingBox!.originY - 15);
    context?.stroke();
    console.log(detections);

    const offScreenCanvas = document.createElement("canvas") as HTMLCanvasElement;
    offScreenCanvas.width = detection.boundingBox!.width + 5;
    offScreenCanvas.height = detection.boundingBox!.height + 5;
    const offScreenCtx = offScreenCanvas.getContext("2d");

    offScreenCtx?.clearRect(0, 0, detection.boundingBox!.width + 5, detection.boundingBox!.height + 5);
    const imgData = context!.getImageData(detection.boundingBox!.originX, detection.boundingBox!.originY, detection.boundingBox!.width + 5, detection.boundingBox!.height + 5);
    let pixels = imgData.data;
    for (var i = 0; i < pixels.length; i += 4) {
      let lightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

      pixels[i] = lightness;
      pixels[i + 1] = lightness;
      pixels[i + 2] = lightness;
    }

    offScreenCtx?.putImageData(imgData, 0, 0, 0, 0, 300, canvas2.height);
    context2?.clearRect(0, 0, canvas2.width, canvas2.height);
    context2?.drawImage(offScreenCanvas, 0, 0, canvas2.width, canvas2.height);
    const tesseractWorker = await createWorker("eng");
    const ocrResult = await tesseractWorker.recognize(canvas2, {});
    await tesseractWorker.terminate();
    setSerialNumber(ocrResult.data.text);
  };

  return (
    <div className="container mx-auto py-8">
      <Heading>Upload your rupee</Heading>
      <Text>Uploading your rupee will list them publicly to all users</Text>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
        <div>
          <Text>Rupee</Text>
          <div
            onClick={(e) => {
              inputRef.current?.click();
            }}
            className=" flex gap-4"
          >
            <canvas id="canvas" height="200px" width="500px" className="bg-gray-100"></canvas>
            <canvas id="canvas2" height="200px" width="500px" className="bg-gray-100"></canvas>
          </div>
        </div>
        <input
          ref={inputRef}
          onChange={async (e) => {
            // if (e.target.files?.item(0)) {
            //   setLoading(true);
            //   setImage(e.target.files[0]);
            //   const res = await storage.createFile("rupees", ID.unique(), e.target.files[0] as File);
            //   setUploadImage(res);
            //   const imageUrl = storage.getFileDownload("rupees", res.$id).href;
            //   const tesseractWorker = await createWorker("eng");
            //   const ocrResult = await tesseractWorker.recognize(imageUrl);
            //   await tesseractWorker.terminate();
            //   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
            //   var context = canvas?.getContext("2d");
            //   const img = new Image();
            //   img.onload = function () {
            //     context?.drawImage(img, 0, 0, canvas.width, canvas.height);
            //     ocrResult.data.lines?.forEach((block) => {
            //       const text = block.text;
            //       const reg = /[A-Z,0-9]{3} [A-Z,0-9]+/;
            //       if (!reg.test(text)) {
            //         return;
            //       }
            //       setSerialNumber(ocrResult.data.text.match(reg)![0] ?? "");
            //       context?.beginPath(); //
            //       context!.lineWidth = 5;
            //       context!.strokeStyle = "red";
            //       context?.rect(block.bbox.x0, block.bbox.y0, block.bbox.x1, block.bbox.y1);
            //       console.log(block);
            //       context?.stroke();
            //     });
            //     detectSerialNumber();
            //   };
            //   img.src = imageUrl;
            //   setLoading(false);
            // }

            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function (e) {
                const img = new Image();

                img.onload = function () {
                  const aspect = img.height / img.naturalHeight;
                  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
                  const ctx = canvas.getContext("2d");
                  ctx?.clearRect(0, 0, canvas.width, canvas.height);
                  ctx?.drawImage(img, 0, 0, 400, canvas.height);
                  detectSerialNumber();
                };
                img.src = e.target?.result?.toString() ?? "";
              };
              reader.readAsDataURL(file);
            }
          }}
          id="myInput"
          type="file"
        />

        <div>
          <Text>Serial Number</Text>
          <TextField.Root value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="2AF 2989990"></TextField.Root>
        </div>
        <div>
          <Button loading={loading}>Add</Button>
        </div>
      </form>
      <div>{isSerialHasDate(serialNumber) && <p>This serial number represents a Date</p>}</div>
    </div>
  );
};

export default UploadRupeePage;
