"use server";

import { fetchAndExtract } from "@/lib/langchain";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY || "");

export async function generatePDFSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File Upload failed",
      data: null,
   
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File URL missing",
      data: null,
      
    };
  }

  try {
    // 1. Extract text from PDF
    const text = await fetchAndExtract(pdfUrl);
    console.log("Extracted text length:", text);

   
    const summary = await generateSummaryFromGemini(text);

console.log(summary)
    return {
      success: true,
      message: "Summary generated successfully with Gemini",
      data: {
        summary,
        fileName,
      },
    };
  } catch (error) {
    console.error("Error in generatePDFSummary:", error);
    return {
      success: false,
      message: `Summary generation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      data: null,
    };
  }
}

export async function generateSummaryFromGemini(text: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", 
      generationConfig: {
        temperature: 0.5,
        topP: 0.9,
        maxOutputTokens: 2000,
      },
    });

    const prompt = `Create a comprehensive markdown summary with:
    - Bullet point key takeaways
    - Relevant emojis
    - Section headings
    - Bolded important terms
    
    Document content:
    ${text.substring(0, 1000000)}`; // Gemini 1.5 supports long context

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summaryText = response.text();

    if (!summaryText || summaryText.trim().length < 10) {
      throw new Error("Insufficient summary generated");
    }

    return summaryText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Gemini API failed"
    );
  }
}
