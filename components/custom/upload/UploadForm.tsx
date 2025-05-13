"use client";

import React from "react";
import { z } from "zod";
import UploadFormInput from "./UploadFormInput";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePDFSummary } from "@/actions/upload-actions";


// Define Zod validation schema
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 24MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF",
    }),
});

const UploadForm = () => {
    const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
      onClientUploadComplete: () => {
        toast.success("uploadt success");
      },
      onUploadError: () => {
          toast.error("error occured while uploading");
      },
      onUploadBegin: ({ file }) => {
       toast.message("📦 Uploading file...");
      },
    });
  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const file = formdata.get("file");

    if (!(file instanceof File)) {
      toast.error("⚠️ No file selected or invalid file type.");
      return;
    }

    const validateFields = schema.safeParse({ file });

    if (!validateFields.success) {
      toast.error(
        validateFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }

   

    const res = await startUpload([file]);
console.log(res)
    if (!res) {
      toast.error("❌ Upload failed. Try again.");
      return;
    }
toast.success("File Uploaded successfully")
    console.log("Upload response:", res);
    //text from url
console.log(res[0].ufsUrl)
const summary=await generatePDFSummary(res)
   
  };


  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
     <UploadFormInput onSubmit={HandleSubmit}/>
    </div>
  );
};

export default UploadForm;
