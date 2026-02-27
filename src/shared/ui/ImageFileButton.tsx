import { useRef } from 'react';

import { ImagePlus } from 'lucide-react';

import { useUploadFile } from '@/entities/upload/hooks/useUploadFile';

import { Button } from './button';

export type ImageFileButtonProps = {
  onUploadComplete: (filename: string) => void;
  onUploadError?: (error: Error) => void;
  onFileSelect?: (file: File) => void;
  className?: string;
};

export const ImageFileButton = ({
  onUploadComplete,
  onUploadError,
  onFileSelect,
  className,
}: ImageFileButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadMutation = useUploadFile();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFileSelect?.(file); // 미리보기용 파일 객체 전달

    uploadMutation.mutate(file, {
      onSuccess: (data) => {
        onUploadComplete(data.filename);
      },
      onError: (error) => {
        if (error instanceof Error) {
          onUploadError?.(error);
        }
      },
    });

    // 같은 파일 재선택 가능하도록 초기화
    e.target.value = '';
  };

  return (
    <>
      <Button
        type="button"
        size="icon"
        onClick={handleClick}
        disabled={uploadMutation.isPending}
        className={`absolute rounded-full ${className ?? ''}`}
      >
        <ImagePlus className="size-5" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};
