// components/custom/summary/DownloadSummaryButton.tsx
"use client";

import { PdfSummary } from "@/actions/summary-action";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DownloadSummaryButton = ({
  summary,
}:{summary:PdfSummary}) => {
  const handleDownloadSummary = () => {
    // Create a blob with the summary text
    const blob = new Blob([summary.summary_text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
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
    <Button variant="outline" onClick={handleDownloadSummary}>
      <Download className="gap-2 hover:bg-gray-100 transition-colors" />
      Download Summary
    </Button>
  );
};
