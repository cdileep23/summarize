import { getSummaryAction } from "@/actions/summary-action";
import PDFSlideViewer from "@/components/custom/upload/PdfSlideViewer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import OriginalPDFViewer from "@/components/custom/summary/OriginalPDFViewer";
import { DownloadSummaryButton } from "@/components/custom/summary/DownloadSummaryButton";
import { ArrowLeft } from "lucide-react";

interface Summary {
  id: string;
  title: string;
  summary_text: string;
  file_name: string;
  original_file_url: string;
  created_at: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page(props:{params:Promise<{id:string}>}) {
  const params=await props.params
  const id =params.id
  const summary :any= await getSummaryAction(id);
console.log(summary)
  if (!summary) {
    redirect("/dashboard");
  }

  // Server-side date formatting to avoid hydration mismatch
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formattedDate = formatDate(summary.created_at);

  const slides = summary.summary_text
    .split("##")
    .map((slide: string) => slide.trim())
    .filter(Boolean);

  const description =
    summary.summary_text
      .split("\n")
      .find((line:string) => line.trim().length > 0 && !line.startsWith("#")) ||
    "Comprehensive summary of the document";

  const readTimeMinutes = Math.ceil(summary.summary_text.length / 1500);
  const fileExtension =
    summary.file_name?.split(".").pop()?.toUpperCase() || "PDF";
  const titleFirstLine = summary.title.split("\n")[0];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {fileExtension}
              </span>
              <span className="text-sm text-gray-500">
                {readTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {titleFirstLine}
            </h1>
            <div className="flex items-center text-gray-500 mt-2">
              <span>{formattedDate}</span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="gap-2 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
        </div>

    
        <div>
        
          <div className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Source:</span> {summary.file_name}
            </div>
            <div className="flex flex-wrap gap-3">
              <OriginalPDFViewer pdfUrl={summary.original_file_url} />
              <DownloadSummaryButton summary={summary} />
            </div>
          </div>

         
          <div className="p-6 md:p-8">
            <div className="prose prose-blue max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Key Insights
              </h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

       
            <div className="border-t pt-6">
              <PDFSlideViewer slides={slides} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
