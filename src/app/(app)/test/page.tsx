"use client";
import { DB_ID, database } from "@/utils/appWrite";
import { FilesetResolver, ObjectDetector } from "@mediapipe/tasks-vision";
import { useEffect } from "react";

const TestPage = () => {
  useEffect(() => {}, []);

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
    const detections = await objectDetector.detect(canvas);

    detections.detections.forEach((detection) => {
      context?.beginPath();
      if (context) {
        context.lineWidth = 3;
        context.strokeStyle = "red";
        context.fillStyle = "red";
        context.font = "20px Arial";
      }
      context?.rect(detection.boundingBox!.originX, detection.boundingBox!.originY, detection.boundingBox!.width, detection.boundingBox!.height);
      context?.fillText(detection.categories.sort((a, b) => (a.score > b.score ? 1 : -1))[0].score.toString(), detection.boundingBox!.originX, detection.boundingBox!.originY - 15);
      context?.stroke();
    });
    console.log(detections);
  };
  return (
    <div>
      <h1>Test</h1>
      <input
        type="file"
        onChange={(e) => {
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
              };
              img.src = e.target?.result?.toString() ?? "";
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <canvas height="200px" width="400px" id="canvas"></canvas>
      <button
        onClick={() => {
          detectSerialNumber();
        }}
      >
        Detect
      </button>
    </div>
  );
};

export default TestPage;
