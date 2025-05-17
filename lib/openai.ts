import { SUMMART_OPENAI_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function generateSummaryfromOpenAi(pdfText:string){
   try {
     const response = await client.chat.completions.create({
       model: "gpt-3.5-turbo",
       messages: [
         {
           role: "system",
           content:SUMMART_OPENAI_PROMPT,
         },
         {
           role: "user",
           content: `Transform this document into an engaging easy-to-read summary with contextually relevant emojis and proper markdown formatting\n\n${pdfText}`,
         },
       ],
       temperature: 0.7,
       max_tokens: 1500,
     });

   
     return response.choices[0].message.content;
   } catch (error:any) {
    if(error?.status==429){
throw new Error('RATE_LIMIT_EXCEDED')
    }
    console.log(error)
   }
}



