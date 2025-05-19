"use client";

import { Button } from "@/components/ui/button";
import { FileText, Loader2, X, Download } from "lucide-react";
import { useState } from "react";

interface OriginalPDFViewerProps {
  pdfUrl: string;
}

export default function OriginalPDFViewer({ pdfUrl }: OriginalPDFViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 900,
  });

  const handleResize = (direction: "in" | "out") => {
    setDimensions((prev) => ({
      width: direction === "in" ? prev.width * 1.1 : prev.width * 0.9,
      height: direction === "in" ? prev.height * 1.1 : prev.height * 0.9,
    }));
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="gap-2 hover:bg-gray-100 transition-colors"
      >
        <FileText className="h-4 w-4" />
        View Original
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in overflow-auto">
          <div
            className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-300"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          >
            {/* Header with controls */}
            <div className="gap-2 hover:bg-gray-100 transition-colors text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Original Document
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleResize("out")}
                    className="p-1 rounded hover:bg-gray-700 transition-colors"
                    aria-label="Zoom out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleResize("in")}
                    className="p-1 rounded hover:bg-gray-700 transition-colors"
                    aria-label="Zoom in"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Close PDF viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-gray-50 min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                <p className="text-gray-500">Loading document...</p>
              </div>
            )}

            {/* PDF Content */}
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
              <div
                className="bg-white shadow-sm mx-auto"
                style={{
                  width: `${dimensions.width}px`,
                  height: `${dimensions.height}px`,
                  minHeight: "60vh",
                }}
              >
                <iframe
                  src={`${pdfUrl}#view=fitH`}
                  className="w-full h-full border-0"
                  title="Original PDF"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </div>

            {/* Footer with download option */}
            <div className="bg-gray-50 p-3 border-t flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {Math.round(dimensions.width)}px ×{" "}
                {Math.round(dimensions.height)}px
              </div>
              <a
                href={pdfUrl}
                download
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Download Original
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
