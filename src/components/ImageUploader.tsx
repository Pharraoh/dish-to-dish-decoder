import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isLoading?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    disabled: isLoading
  });

  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-smooth bg-gradient-subtle",
            isDragActive ? "border-primary bg-primary/5 shadow-warm" : "border-border hover:border-primary hover:bg-primary/5",
            isLoading && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isDragActive ? "Drop your food image here" : "Upload a food image"}
              </h3>
              <p className="text-muted-foreground">
                Drag & drop or click to select a photo of your dish
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Supports JPG, PNG, WebP (max 10MB)
              </p>
            </div>
            <Button variant="hero" size="lg" disabled={isLoading}>
              <ImageIcon className="w-5 h-5" />
              Choose Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={uploadedImage}
            alt="Uploaded food"
            className="w-full h-64 object-cover rounded-xl shadow-elegant"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
            onClick={clearImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};