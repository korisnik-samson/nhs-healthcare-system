'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileUploaderProps } from "@/types";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='file-upload'>
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <Image src={convertFileToUrl(files[0])} alt='uploaded document' height={1000} width={1000}
                    className='max-h-[400px] overflow-hidden object-cover' />
            ) : (
                <React.Fragment>
                    <Image src='/assets/icons/upload.svg' alt='upload' height={40} width={40} />
                    <div className='file-upload_label'>
                        <p className='text-14-regular'>
                            <span className='text-green-500'>
                                Click to upload
                            </span> or drag and drop files here
                        </p>
                        <p>PDF, PNG, JPG, SVG</p>
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}

export default FileUploader;