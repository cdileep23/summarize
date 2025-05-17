import { SUMMART_OPENAI_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY || "");

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" ,generationConfig:{
      temperature:0.7,
      maxOutputTokens:1500
    }});

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMART_OPENAI_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    if(!text){
      throw new Error("Empty response from free API")
    }
    return text;
  } catch (error: any) {
  

    // Rate limit handling (adjust based on observed behavior)
      console.error("Error during Gemini API call:", error);
      throw new error
   
  }
}
