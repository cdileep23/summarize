"use server";

import { getDBConnection } from "@/lib/action";
import { fetchAndExtract } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY || "");

interface pdfSummary {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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
    const text = await fetchAndExtract(pdfUrl);
    const summary = await generateSummaryFromGemini(text);

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
    ${text.substring(0, 1000000)}`;

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

export async function savedPdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummary): Promise<boolean> {
  try {
    const sql = await getDBConnection();
    await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name)
      VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName});
    `;
    return true;
  } catch (error) {
    console.log("Error saving PDF Summary", error);
    return false;
  }
}

export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummary) {
  try {
    const authData = await auth();
    const currentUserId = authData?.userId;
    if (!currentUserId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const saveSummary = await savedPdfSummary({
      userId: currentUserId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!saveSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again",
      };
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Saved successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }
}
