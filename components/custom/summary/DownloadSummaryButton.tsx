
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
export interface PdfSummary {
  id: string;
  user_id: string;
  original_file_url: string;
  summary_text: string;
  status: string;
  title: string;
  file_name: string;
  created_at: string; // or Date
  updated_at: string; // or Date
}

export const DownloadSummaryButton = ({ summary }: { summary: PdfSummary }) => {
  const handleDownloadSummary = () => {

    const blob = new Blob([summary.summary_text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    
    const a = document.createElement("a");
    a.href = url;
    a.download =
      `${summary.file_name?.replace(/\.[^/.]+$/, "")}_summary.txt` ||
      "summary.txt";
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownloadSummary}
      className="gap-2 hover:bg-gray-100 transition-colors"
    >
      <Download className="h-4 w-4" />
      Download Summary
    </Button>
  );
};
