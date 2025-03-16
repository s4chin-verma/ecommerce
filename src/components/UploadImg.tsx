import React, { ChangeEvent, useEffect, useState } from 'react';
import { Cloud, Loader2 } from 'lucide-react';
import { SupabaseImageUpload } from '@/lib/supabase';
import { toast } from 'sonner';

type Props = {
  handleCallback: (url: string) => void;
  id?: string;
  maxSizeMB?: number;
  isFormSubmitted?: boolean;
};

const UploadImg = ({
  handleCallback,
  id = 'image-upload',
  maxSizeMB = 10,
  isFormSubmitted = false,
}: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [prevFormSubmitted, setPrevFormSubmitted] = useState(false);

  // This useEffect will detect when isFormSubmitted changes from false to true
  useEffect(() => {
    if (isFormSubmitted && !prevFormSubmitted) {
      setImagePreview(null);
    }
    setPrevFormSubmitted(isFormSubmitted);
  }, [isFormSubmitted, prevFormSubmitted]);

  const handleFile = async (file: File) => {
    if (file.size / 1024 / 1024 > maxSizeMB) {
      toast.warning(`File size too big (max ${maxSizeMB}MB)`);
      return;
    }

    setLoading(true);
    try {
      const uploadedUrl = await SupabaseImageUpload(file); // Upload to Supabase and get URL
      handleCallback(uploadedUrl); // Pass the URL back to parent component
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string); // Set image preview
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onChangePicture = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="mt-8 w-52">
      <label
        htmlFor={id}
        className="group relative flex h-56 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
      >
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        />
        <div
          className={`${
            dragActive ? 'border-2 border-black' : ''
          } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-3 transition-all ${
            imagePreview
              ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
              : 'bg-white opacity-100 hover:bg-gray-50'
          }`}
        >
          <Cloud
            className={`${
              dragActive ? 'scale-110' : 'scale-100'
            } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
          />
          <p className="mt-2 text-center text-sm text-gray-500">
            Drag and drop or click to upload.
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Max file size: {maxSizeMB}MB
          </p>
          <span className="sr-only">Photo upload</span>
        </div>
        {loading ? (
          <Loader2 className="animate-spin h-6 w-6" />
        ) : (
          imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )
        )}
      </label>
      <input
        id={id}
        name="image"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onChangePicture}
      />
    </div>
  );
};

export { UploadImg };
