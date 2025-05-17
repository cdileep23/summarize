"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import React, { forwardRef } from "react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const UploadFormInput = forwardRef<
  HTMLFormElement,
  UploadFormInputProps
>(({ onSubmit, isLoading }, ref) => {
  return (
    <div>
      <form
        ref={ref}
        className="flex flex-col gap-6 items-center"
        onSubmit={onSubmit}
      >
        <div className="flex justify-end items-center gap-1.5">
          <Input
            id="file"
            name="file"
            className=""
            accept="application/pdf"
            required
            type="file"
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader size={16} className="animate-spin mr-2" />
                Processing
              </>
            ) : (
              "Upload Your File"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
});

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
