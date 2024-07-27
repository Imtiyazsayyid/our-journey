"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          height={1000}
          width={1000}
          alt="Uploaded Image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image src="/assets/icons/upload.svg" className="mt-10" height={40} width={40} alt="Uploaded Icon" />
          <div className="file-upload_label pb-10">
            <p className="text-14-regular">
              <span className="text-fun-200">Click to upload</span> or drag and drop
            </p>
            <p>SVG, PNG, JPG or Gif &#40;max 800x400&#41;</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
