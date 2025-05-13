import UploadForm from '@/components/custom/upload/UploadForm';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import React from 'react'

const page = () => {
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="flex mb-6">
            <div className="px-4 py-2 rounded-full border border-rose-500">
              <div className="flex items-center text-rose-600">
                <Sparkles className="w-5 h-5 mr-2 text-rose-600" />
                <span className="font-medium">AI-Powered Content Creation</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Start Uploading Your PDF
          </h1>

          <p className="text-gray-600">
            Upload your PDF and let our AI do the magic
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadForm />
        </div>
      </div>
    </section>
  );
}

export default page