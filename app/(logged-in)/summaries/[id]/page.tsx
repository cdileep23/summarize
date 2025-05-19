import { getSummaryAction } from "@/actions/summary-action";
import PDFSlideViewer from "@/components/custom/upload/PdfSlideViewer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import OriginalPDFViewer from "@/components/custom/summary/OriginalPDFViewer";
import { DownloadSummaryButton } from "@/components/custom/summary/DownloadSummaryButton";

const Page = async ({ params }: { params: { id: string } }) => {
  const summary = await getSummaryAction(params.id);

  if (!summary) {
    return redirect("/dashboard");
  }

  const slides = summary.summary_text
    .split("##")
    .map((slide: string) => slide.trim())
    .filter(Boolean);


  const description =
    summary.summary_text
      .split("\n")
      .find((line) => line.trim().length > 0 && !line.startsWith("#")) ||
    "Comprehensive summary of the document";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
       
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {summary.file_name?.split(".").pop()?.toUpperCase() || "PDF"}
              </span>
              <span className="text-sm text-gray-500">
                {Math.ceil(summary.summary_text.length / 1500)} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {summary.title.split("\n")[0]}
            </h1>
            <div className="flex items-center text-gray-500 mt-2">
              <span>
                {new Date(summary.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
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
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Summary Container */}
        <div >
          {/* Action Bar */}
          <div className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Source:</span> {summary.file_name}
            </div>
            <div className="flex flex-wrap gap-3">
              <OriginalPDFViewer pdfUrl={summary.original_file_url} />
              <DownloadSummaryButton summary={summary} />
            </div>
          </div>

          {/* Summary Content */}
          <div className="p-6 md:p-8">
            <div className="prose prose-blue max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Key Insights
              </h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Slides Viewer */}
            <div className="border-t pt-6">
              <PDFSlideViewer slides={slides} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
