import DashboardCard from "@/components/custom/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, FileIcon, FileText, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const limit = 5;
  const user = await currentUser();
  if (!user?.id) {
    return redirect("/");
  }
  const summaries = await getSummaries(user?.id);

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center pt-6">
          <div>
            <h2 className="font-extrabold text-rose-600 text-2xl">
              Your Summaries
            </h2>
            <p className="text-gray-700 mt-1">
              Transform your PDFs into concise, actionable insights
            </p>
          </div>

          <Link href="/upload" passHref>
            <Button
              asChild
              variant="link"
              className="text-white flex items-center space-x-2"
            >
              <span>
                <PlusIcon className="w-5 h-5 inline-block mr-1" />
                New Summary
              </span>
            </Button>
          </Link>
        </div>

    

      
        {summaries.length > 0 ? (
          
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary) => (
              <DashboardCard key={summary.id} summary={summary} />
            ))}
          </div>
        ) : (
        
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="max-w-md space-y-4">
              <FileText className="w-20 h-20 mx-auto text-gray-200" />
              <h3 className="text-xl font-semibold text-gray-900">
                No summaries yet
              </h3>
              <p className="text-gray-500">
                Get started by uploading your first PDF to create a summary.
              </p>
              <Link href="/upload" passHref>
                <Button className="mt-4 mx-auto bg-rose-600 hover:bg-rose-700 text-white flex items-center">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create First Summary
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
