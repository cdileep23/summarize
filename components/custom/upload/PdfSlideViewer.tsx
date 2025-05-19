"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
} from "lucide-react";

const PDFSlideViewer = ({ slides }: { slides: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Scroll to top when toggling fullscreen
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape" && isFullscreen) toggleFullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides.length, isAnimating, isFullscreen]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const renderSlideContent = (content: string) => {
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
            className: `font-bold mb-4 ${
              level === 1
                ? "text-3xl bg-gradient-to-r from-primary to-accent-foreground text-transparent bg-clip-text animate-gradient-x"
                : level === 2
                ? "text-2xl text-primary"
                : "text-xl text-accent-foreground"
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
            className="list-none pl-6 mb-6 space-y-3 text-left"
          >
            {items.map((item, iIndex) => (
              <li
                key={`li-${pIndex}-${iIndex}`}
                className="flex items-start group"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3 group-hover:bg-accent-foreground transition-colors duration-300"></span>
                <span className="text-foreground group-hover:text-foreground transition-colors duration-300">
                  {renderTextWithFormatting(item)}
                </span>
              </li>
            ))}
          </ul>
        );
      }

      // Handle regular paragraphs
      return (
        <div
          key={`p-${pIndex}`}
          className="mb-5 text-foreground text-left leading-relaxed hover:text-foreground transition-colors duration-300"
        >
          {renderTextWithFormatting(paragraph)}
        </div>
      );
    });
  };

  const renderTextWithFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|:[a-z_]+:)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span
            key={`bold-${index}`}
            className="font-bold relative text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
          >
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
    <div
      className={`w-full bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden border border-border transition-all duration-500 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
    >
      {/* Header with animated background */}
      <div className="bg-gradient-to-r from-secondary to-secondary/50 backdrop-blur-sm px-6 py-4 flex justify-between items-center border-b border-border animate-gradient-x">
        <div className="flex items-center space-x-2">
          <FileText className="text-primary" size={20} />
          <h3 className="font-bold text-primary text-lg">PDF Summary</h3>
        </div>
        <div className="flex space-x-3 items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0 || isAnimating}
            className={`p-2 rounded-full transition-all duration-300 ${
              currentSlide === 0
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="text-xs font-medium text-foreground bg-background px-3 py-1 rounded-full shadow-sm">
            {currentSlide + 1} / {slides.length}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1 || isAnimating}
            className={`p-2 rounded-full transition-all duration-300 ${
              currentSlide === slides.length - 1
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="ml-2 p-2 rounded-full bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Slide content with theme styling */}
      <div
        ref={contentRef}
        className={`p-8 overflow-y-auto bg-card bg-opacity-90 transition-all duration-500 ${
          isFullscreen ? "h-full" : "min-h-64 md:min-h-96"
        }`}
      >
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="prose max-w-none w-full mx-auto">
            {renderSlideContent(slides[currentSlide])}
          </div>
        </div>
      </div>

      {/* Animated pagination indicators */}
      <div className="bg-gradient-to-r from-secondary to-secondary/50 px-6 py-4 flex justify-center border-t border-border animate-gradient-x">
        <div className="flex space-x-2 items-center">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentSlide(index);
                }
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-gradient-to-r from-primary to-accent-foreground w-8 shadow-md animate-gradient-x"
                  : "bg-muted hover:bg-muted-foreground w-2.5"
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
