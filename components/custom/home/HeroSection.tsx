"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
  
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-50/50 via-white to-rose-100/30" />


      <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-20 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative mx-auto flex flex-col items-center justify-center px-4 py-16 sm:py-20 lg:py-28 lg:px-8 max-w-7xl">
    
        <div className="flex mb-6">
          <Badge className="relative p-2 px-4 overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-400 to-rose-600 animate-gradient-x">
            <Sparkles className="w-5 h-5 mr-2 text-white" />
            <span className="text-white font-medium">Powered by AI</span>
          </Badge>
        </div>

    
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-900 max-w-4xl leading-tight sm:leading-tight md:leading-tight">
          Transform <span className="text-rose-600">PDFs</span> into concise{" "}
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text">
            summaries
          </span>
        </h1>

     
        <h2 className="mt-6 text-lg sm:text-xl md:text-2xl text-center text-gray-600 max-w-3xl leading-relaxed">
          Get a beautiful summary reel of any document in{" "}
          <span className="font-semibold text-rose-600">seconds</span> with our
          AI-powered summarization tool
        </h2>

     
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="px-8 py-6 text-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-rose-200/50 transition-all"
          >
            <Link href="/upload">Try Summarize Now</Link>
          </Button>
         
        </div>

       
      </div>
    </section>
  );
};
