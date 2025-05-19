"use client";
import React, { useRef, useState, useEffect } from "react";
import { z } from "zod";
import UploadFormInput from "./UploadFormInput";
import PDFSlideViewer from "./PdfSlideViewer";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePDFSummary, storePdfSummaryAction } from "@/actions/upload-actions";

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
const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setLoading] = useState(false);
  const [summarySlides, setSummarySlides] = useState<string[]>([]);
  

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("PDF uploaded successfully!", {
        description: "Your file is now being processed",
        duration: 3000,
      });
    },
    onUploadError: () => {
      toast.error("Upload failed", {
        description: "Please try again or check your file",
        duration: 3000,
      });
    },
    onUploadBegin: () => {
      toast.message("Uploading your PDF...", {
        description: "Please wait while we upload your file",
        duration: 2000,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSummarySlides([]);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file");

      if (!(file instanceof File)) {
        toast.warning("No file selected", {
          description: "Please select a PDF file to upload",
          duration: 3000,
        });
        setLoading(false);
        formRef.current?.reset();
        return;
      }

      const validateFields = schema.safeParse({ file });
      if (!validateFields.success) {
        toast.error("Invalid file", {
          description:
            validateFields.error.flatten().fieldErrors.file?.[0] ??
            "Please check your file",
          duration: 3000,
        });
        setLoading(false);
        formRef.current?.reset();
        return;
      }

      // Show upload starting toast
      toast.info("Starting upload", {
        description: "Preparing your PDF for upload",
        duration: 2000,
      });

      const res = await startUpload([file]);

      if (!res || !res[0]?.url) {
        toast.error("Upload failed", {
          description: "Couldn't complete the upload. Please try again.",
          duration: 3000,
        });
        setLoading(false);
        formRef.current?.reset();
        return;
      }

      // Show processing toast
      const processingToast = toast.message("Processing PDF", {
        description: "Generating summary from your document...",
        duration: Infinity, // Will manually dismiss
      });

      // Extract PDF text and summarize
      const result = await generatePDFSummary(res);
      const { data = null, message = null } = result || {};

      toast.dismiss(processingToast);

      if (data) {
        // Split the summary by "##" and create slides
        const slides = data.summary
          .split("##")
          .map((slide) => slide.trim())
          .filter(Boolean);
        let rawTitle = slides[0];
        let title = rawTitle.replace(/^\s*#+\s*/, "");

        setSummarySlides(slides);
        await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: res[0].serverData.file.url,
          title,
          fileName: data.fileName,
        });
     

        toast.success("PDF processed & Stored successfully ✅", {
          description: "Your summary is ready",
          duration: 3000,
        });
        formRef.current?.reset();
      } else {
        toast.error("Processing failed", {
          description: message || "Couldn't generate summary from the PDF",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: "An unexpected error occurred. Please try again.",
        duration: 3000,
      });
    } finally {
      setLoading(false);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />

      {summarySlides.length > 0 && <PDFSlideViewer slides={summarySlides} />}
    </div>
  );
};

export default UploadForm;
