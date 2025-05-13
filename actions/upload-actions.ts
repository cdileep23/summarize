"use server"

import { fetchAndExtract } from "@/lib/langchain"

export async function generatePDFSummary(uploadResponse:[{
    serverData:{
        userId:string,
        file:{
            url:string,
            name:string
        }
    }
}]){
 if(!uploadResponse){
    return {
        success:false,
        message:'File Upload failed',
        data:null
    }
 }   
 const {serverData:{userId,file:{url:pdfUrl,name:fileName}}}=uploadResponse[0]
 if(!pdfUrl){
     return {
       success: false,
       message: "File Upload failed",
       data: null,
     };
 }
 try {
    const text=await fetchAndExtract(pdfUrl)
    console.log(text)
 } catch (error) {
     return {
       success: false,
       message: "File Upload failed",
       data: null,
     };
 }
}