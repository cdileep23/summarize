"use server"

import { getDBConnection } from "@/lib/action"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function deleteSummary(summaryId:string){
    try {
        const user=await currentUser()
        const userId=user?.id
    
        if(!userId){
            throw new Error("User Not Found")
        }
       //delete from dtabase
       const sql=await getDBConnection()
        const result=await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id;`;
       
        if(result.length>0){
            revalidatePath('/dashboard')
        }
        return {
            success:true
        }
    } catch (error) {
        console.log("error delteing Error",error)
        return {success:false}
    }

}

export async function getSummaryAction(id:string){
    try {
        const sql=await getDBConnection()
        const[summary]=await sql `SELECT * FROM pdf_summaries where id=${id}`
        console.log(summary)
        return summary
    } catch (error) {
        console.error("error fecthing summary by id:", id)
        return null
    }
}
export interface PdfSummary {
  id: string;
  user_id: string;
  original_file_url: string;
  summary_text: string;
  status: "completed" | "processing" | "failed"; // Assuming possible status values
  title: string;
  file_name: string;
  created_at: string | Date;
  updated_at: string | Date;
}