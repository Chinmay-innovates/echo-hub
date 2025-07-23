'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, FileIcon, Upload, X } from 'lucide-react';

import { UploadButton } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  endpoint: 'serverImage' | 'messageFile';
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const [fileSelected, setFileSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

  const fileType = value.split('.').pop()?.toLowerCase();
  const fileName = value.split('/').pop();
  const isPdf =
    mimeType?.startsWith('application/pdf') || value.endsWith('.pdf');

  React.useEffect(() => {
    if (value) {
      setFileSelected(true);
      setUploadError(null);
      detectMimeType(value).then(setMimeType);
    }
  }, [value]);

  console.log({ value, mimeType, fileType, isPdf });

  const detectMimeType = async (url: string): Promise<string | null> => {
    try {
      const res = await fetch(
        `/api/detect-mime?url=${encodeURIComponent(url)}`
      );
      const data = await res.json();
      return data.mimeType ?? null;
    } catch (err) {
      console.error('Failed to detect MIME type', err);
      return null;
    }
  };

  // IMAGE UPLOAD PREVIEW
  if (value && !isPdf) {
    return (
      <div className="relative group">
        <div className="relative size-24 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <Image
            fill
            src={value}
            alt="Uploaded file"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        <button
          onClick={() => {
            onChange('');
            setFileSelected(false);
          }}
          className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white p-1.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
          type="button"
        >
          <X className="size-3" />
        </button>
        <div className="absolute -bottom-1 left-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-b-lg text-center">
          <CheckCircle className="size-3 inline mr-1" />
          Uploaded
        </div>
      </div>
    );
  }

  // PDF UPLOAD PREVIEW
  if (value && isPdf) {
    return (
      <div className="relative flex items-center p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 hover:shadow-md transition-all duration-300">
        <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg">
          <FileIcon className="size-8 fill-indigo-200 stroke-indigo-600" />
        </div>
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-indigo-700 hover:text-indigo-800 hover:underline truncate block"
        >
          {fileName}
        </a>
        <button
          onClick={() => {
            onChange('');
            setFileSelected(false);
          }}
          className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white p-1.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
          type="button"
        >
          <X className="size-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          const mime = res?.[0].type;
          onChange(res?.[0].ufsUrl);
          setMimeType(mime);
          setFileSelected(true);
          setIsUploading(false);
          setUploadError(null);
        }}
        onUploadError={(err) => {
          console.error('Upload error:', err);
          setUploadError(err.message || 'Upload failed');
          setIsUploading(false);
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          setUploadError(null);
        }}
        className={cn(
          `
        w-full 
        border-2 
        rounded-xl 
        text-center 
        relative 
        overflow-hidden 
        transition-all 
        duration-300
        group
        px-6 py-8
        flex flex-col items-center justify-center
        min-h-[120px]
          ut-button:bg-gradient-to-r
          ut-button:from-blue-500
          ut-button:to-blue-600
          ut-button:text-white
          ut-button:px-6
          ut-button:py-3
          ut-button:mb-3
          ut-button:rounded-lg
          ut-button:font-medium
          ut-button:transition-all
          ut-button:duration-200
          ut-button:shadow-md
          ut-button:hover:shadow-lg
          ut-button:hover:from-blue-600
          ut-button:hover:to-blue-700
          ut-button:hover:transform
          ut-button:hover:scale-105
          ut-button:ut-uploading:from-blue-400
          ut-button:ut-uploading:to-blue-500
          ut-button:ut-uploading:cursor-not-allowed
          ut-button:ut-readying:from-blue-300
          ut-button:ut-readying:to-blue-400
          ut-button:ut-readying:cursor-not-allowed
          ut-button:disabled:opacity-50
          ut-button:disabled:cursor-not-allowed
          ut-button:disabled:transform-none
        `,
          uploadError
            ? 'border-red-300 bg-red-50 hover:bg-red-100'
            : fileSelected
            ? 'border-green-400 bg-green-50 hover:bg-green-100'
            : isUploading
            ? 'border-blue-400 bg-blue-50'
            : 'border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        )}
        appearance={{
          button: cn(
            'text-base transition-all duration-200  font-medium',
            fileSelected ? 'text-green-700 font-semibold' : '',
            isUploading ? 'text-blue-700' : '',
            uploadError ? 'text-red-700' : ''
          ),
        }}
        content={{
          button: ({ ready, isUploading }) => {
            if (uploadError) {
              return (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="size-4" />
                  <span>Try Again</span>
                </div>
              );
            }
            if (isUploading) {
              return (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin size-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Uploading...</span>
                </div>
              );
            }
            if (ready) {
              return (
                <div className="flex items-center space-x-2">
                  <Upload className="size-4" />
                  <span>Choose File</span>
                </div>
              );
            }
            return 'Getting ready...';
          },
          allowedContent: ({ ready, fileTypes, isUploading }) => {
            if (uploadError) {
              return (
                <div className="text-red-600 text-sm mt-2">
                  <AlertCircle className="size-4 inline mr-1" />
                  {uploadError}
                </div>
              );
            }
            if (isUploading) {
              return (
                <div className="text-blue-600 text-sm mt-2">
                  Processing your file...
                </div>
              );
            }
            if (ready) {
              return (
                <div className="text-gray-500 text-sm mt-2">
                  Drop files here or click to browse
                  <br />
                  <span className="text-xs text-gray-400">
                    Supports: {fileTypes.join(', ')}
                  </span>
                </div>
              );
            }
            return (
              <div className="text-gray-400 text-sm mt-2">
                Preparing upload...
              </div>
            );
          },
        }}
      />

      {/* Upload progress indicator */}
      {isUploading && (
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-2 rounded-full animate-pulse"
            style={{ width: '60%' }}
          />
        </div>
      )}

      {/* Success message */}
      {fileSelected && !isUploading && (
        <div className="mt-3 flex items-center justify-center text-green-600 text-sm font-medium">
          <CheckCircle className="size-4 mr-2" />
          File uploaded successfully!
        </div>
      )}
    </div>
  );
};
