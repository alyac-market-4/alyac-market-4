import { useRef, useState } from 'react';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { ImageFileButton, ProfileAvatar } from '@/shared/ui';

interface ProfileImageUploadProps {
  initialImage?: string;
  alt: string;
  onUploadComplete: (filename: string) => void;
}

export const ProfileImageUpload = ({
  initialImage,
  alt,
  onUploadComplete,
}: ProfileImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(initialImage);
  const uploadMutation = useUploadFiles();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        onUploadComplete(data[0].filename);
      },
      onError: (error) => {
        if (error instanceof Error) alert('업로드 실패: ' + error.message);
        setImagePreview(initialImage);
      },
    });

    e.target.value = '';
  };

  return (
    <div className="relative inline-block">
      <ProfileAvatar src={imagePreview} alt={alt} size="xl" />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <ImageFileButton
        onClick={handleButtonClick}
        disabled={uploadMutation.isPending}
        className="absolute right-0 bottom-0 bg-[var(--main-button)] hover:bg-[var(--main-button-hover)]"
      />
    </div>
  );
};
