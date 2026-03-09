import { useRef, useState } from 'react';

import { toast } from 'sonner';

import { imageFileSchema } from '@/entities/profile';
import { useUploadFile } from '@/entities/upload';
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
  const uploadMutation = useUploadFile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = imageFileSchema.safeParse({ file });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      e.target.value = '';
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    console.log(file);
    uploadMutation.mutate(file, {
      onSuccess: (data) => {
        onUploadComplete(data.filename);
      },
      onError: (error) => {
        if (error instanceof Error) toast.error('업로드 실패: ' + error.message);
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
        className="bg-main-alyac-color hover:bg-main-alyac-color-hover absolute right-0 bottom-0"
      />
    </div>
  );
};
