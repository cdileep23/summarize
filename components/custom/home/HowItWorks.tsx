import { BrainCircuit, File, FileOutput } from "lucide-react";
import React, { ReactNode } from "react";

type Steps = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Steps[] = [
  {
    icon: <File className="w-12 h-12 sm:w-16 sm:h-16" strokeWidth={1.5} />,
    label: "Upload PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: (
      <BrainCircuit className="w-12 h-12 sm:w-16 sm:h-16" strokeWidth={1.5} />
    ),
    label: "AI Analysis",
    description:
      "Our Advanced AI processes and analyzes your document instantly",
  },
  {
    icon: (
      <FileOutput className="w-12 h-12 sm:w-16 sm:h-16" strokeWidth={1.5} />
    ),
    label: "Get Summary",
    description: "Receive a clear, concise summary of your document",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/20 to-white py-12 lg:py-24">
    
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-rose-100 text-rose-600 mb-4">
            How it Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Summarize in <span className="text-rose-600">3 Easy Steps</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered process makes document summarization quick and
            effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, idx) => (
            <StepCard key={idx} {...step} stepNumber={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

function StepCard({
  icon,
  label,
  description,
  stepNumber,
}: Steps & { stepNumber?: number }) {
  return (
    <div className="relative group">
     
      {stepNumber && (
        <div className="absolute -top-4 -left-4 w-8 h-8 flex items-center justify-center rounded-full bg-rose-600 text-white font-bold text-sm z-10">
          {stepNumber}
        </div>
      )}

      <div className="relative h-full p-6 sm:p-8 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-rose-300 overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/10 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      
        <div className="w-14 h-14 sm:w-16 sm:h-16 mb-6 flex items-center justify-center rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-100 transition-colors duration-300">
          {icon}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">{label}</h3>
        <p className="text-gray-600">{description}</p>

        
        <div className="absolute right-6 bottom-6 text-rose-600 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
