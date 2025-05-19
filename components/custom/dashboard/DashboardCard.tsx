import { Card } from "@/components/ui/card";
import React from "react";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
interface summaryCard {
  status: string;
  created_at: Date;
  title: string;
  summary_text: string;
  updated_at: Date;
  id: string;
  user_id: string;
  original_file_url:string
}
const DashboardCard = ({ summary }) => {
  const formattedDate = summary.created_at
    ? formatDistanceToNow(new Date(summary.created_at), { addSuffix: true })
    : "Unknown date";

  return (
    <Card className="relative h-full hover:shadow-md transition-shadow duration-200 border border-gray-200 rounded-lg overflow-hidden">

      <div className="absolute top-2 right-2 flex items-center gap-2">
        <DeleteButton summaryId={summary.id} />
      </div>
      <Link href={`/summaries/${summary.id}`} className="block p-3">
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <FileText className="h-5 w-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {summary.title?.split("\n")[0] || "Untitled Summary"}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
          </div>
        </div>
      </Link>

    
      <div className="px-5 pb-4 space-y-3">
        <p className="text-xs text-gray-400 flex items-center truncate">
          {summary.summary_text}
        </p>
        <Badge
          variant="outline"
          className={`${
            summary.status === "completed"
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          {summary.status || "Completed"}
        </Badge>
      </div>
    </Card>
  );
};

export default DashboardCard;
