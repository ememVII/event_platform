"use client";
 
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";

type FileUploaderProps = {
  onFieldChange: (url: string) => void,
  imageUrl: string,
  setFiles: Dispatch<SetStateAction<File[]>>
  
}

export const FileUploader = ({ onFieldChange, imageUrl, setFiles } : FileUploaderProps) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, []);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });
 
  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 cursor-pointer h-72 bg-gray-50 rounded-xl overflow-hidden">
      <input {...getInputProps()} className="cursor-pointer"/>
      
      {
        imageUrl ? 
        <div className='flex h-full w-full flex-1 justify-center'>
          <img 
            src={imageUrl}
            alt='event image'
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div> 
        : 
        <div className='flex-center flex-col py-7 text-gray-500'>
          <img src='/assets/icons/file-upload.svg' alt='upload file' width={80} height={80} />
          <h3 className='my-2'>Drag photo here</h3>
          <p className='p-medium-14 mb-2'>SVG, PNG, JPG</p>
          <Button type='button'>Select from computer</Button>
        </div>
      }
      
    </div>
  );
}