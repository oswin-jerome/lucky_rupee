// UploadRupeePage.jsx
"use client";
import { DB_ID, account, database, storage } from "@/utils/appWrite";
import { Button, Heading, Text, TextField } from "@radix-ui/themes";
import { ID } from "appwrite";
import React, { FormEvent, useEffect, useRef, useState } from "react";

const UploadRupeePage = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

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
    const user = await account.get();
    const res = await storage.createFile("rupees", ID.unique(), image as File);
    const rupee = await database.createDocument(DB_ID, "rupees", ID.unique(), {
      serialNumber,
      image_id: res.$id,
      users: user.$id,
    });
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
            className="bg-slate-100 h-32 rounded border-2 border-dashed border-slate-500"
          >
            <img className="h-full" alt="" src={imgUrl} />
          </div>
        </div>
        <input
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files?.item(0)) {
              setImage(e.target.files[0]);
            }
          }}
          id="myInput"
          type="file"
          className="hidden"
        />

        <div>
          <Text>Serial Number</Text>
          <TextField.Root value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="2AF 2989990"></TextField.Root>
        </div>
        <div>
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
};

export default UploadRupeePage;
