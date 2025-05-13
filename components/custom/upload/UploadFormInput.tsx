"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import React from 'react'
interface UploadFormInputProps{
    onSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
}
const UploadFormInput = ({onSubmit}:UploadFormInputProps) => {
  return (
    <div>
      {" "}
      <form className="flex flex-col gap-6 items-center" onSubmit={onSubmit}>
        <div className='flex justify-end items-center gap-1.5'>
          <Input
            id="file"
            name="file"
            className=""
            accept="application/pdf"
            required
            type="file"
          />
          <Button type='submit'>Upload Your File</Button>
        </div>
      </form>
    </div>
  );
}

export default UploadFormInput