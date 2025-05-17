"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PDFSlideViewer = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides.length, isAnimating]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const renderSlideContent = (content) => {
    const paragraphs = content.split(/\n\n+/).filter((p) => p.trim());

    return paragraphs.map((paragraph, pIndex) => {
      paragraph = paragraph.trim();

      // Handle headings
      if (paragraph.startsWith("#")) {
        const level = paragraph.match(/^#+/)?.[0]?.length || 1;
        const headingText = paragraph.replace(/^#+\s/, "").trim();

        const HeadingTag = `h${Math.min(level + 1, 6)}`; // Convert # to h2, ## to h3, etc.

        return React.createElement(
          HeadingTag,
          {
            key: `h-${pIndex}`,
            className: `font-bold text-gray-800 mb-4 ${
              level === 1 ? "text-2xl" : level === 2 ? "text-xl" : "text-lg"
            }`,
          },
          headingText
        );
      }

      // Handle bullet points
      if (paragraph.startsWith("*") && !paragraph.startsWith("**")) {
        const items = paragraph
          .split(/\n\s*\*\s+/)
          .filter((item) => item.trim());
        if (items[0].startsWith("*")) {
          items[0] = items[0].substring(1).trim();
        }

        return (
          <ul
            key={`ul-${pIndex}`}
            className="list-disc pl-6 mb-4 space-y-2 text-left"
          >
            {items.map((item, iIndex) => (
              <li key={`li-${pIndex}-${iIndex}`} className="text-gray-700">
                {renderTextWithFormatting(item)}
              </li>
            ))}
          </ul>
        );
      }

      // Handle regular paragraphs
      return (
        <div key={`p-${pIndex}`} className="mb-4 text-gray-700 text-left">
          {renderTextWithFormatting(paragraph)}
        </div>
      );
    });
  };

  const renderTextWithFormatting = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|:[a-z_]+:)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={`bold-${index}`} className="font-bold text-rose-600">
            {part.slice(2, -2)}
          </span>
        );
      } else if (part.startsWith(":") && part.endsWith(":")) {
        return part;
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Slide header with controls */}
      <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-b">
        <h3 className="font-semibold text-gray-700">PDF Summary</h3>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0 || isAnimating}
            className={`p-2 rounded-full transition-colors ${
              currentSlide === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-rose-700"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1 || isAnimating}
            className={`p-2 rounded-full transition-colors ${
              currentSlide === slides.length - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-rose-700"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className="p-6 min-h-64 md:min-h-96 relative overflow-y-auto">
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isAnimating ? "opacity-90" : "opacity-100"
          }`}
        >
          <div className="prose max-w-none w-full mx-auto">
            {renderSlideContent(slides[currentSlide])}
          </div>
        </div>
      </div>

      {/* Pagination - only dots */}
      <div className="bg-gray-50 px-6 py-3 flex justify-center border-t">
        <div className="flex space-x-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentSlide(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-primary w-4"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFSlideViewer;
