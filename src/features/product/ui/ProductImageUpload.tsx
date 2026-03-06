import { useRef, useState } from 'react';

import { toast } from 'sonner';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { imageUrl } from '@/shared/lib/imageUrl';
import { ProductImageUploadBase } from '@/shared/ui/ProductImageUploadBase';

interface ProductImageUploadProps {
  initialImage?: string; // ← update일 때만 넘겨줌, create는 안 넘겨도 됨
  onUploadComplete: (filenames: string[]) => void;
}

export const ProductImageUpload = ({ initialImage, onUploadComplete }: ProductImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImage ? imageUrl(initialImage) : null, // ← 있으면 기존 이미지, 없으면 null
  );
  const uploadMutation = useUploadFiles();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        onUploadComplete(data.map((item) => item.filename));
      },
      onError: (error) => {
        if (error instanceof Error) toast.error('이미지 업로드에 실패했습니다.');
        setImagePreview(initialImage ? imageUrl(initialImage) : null); // ← 실패 시 복구
      },
    });

    e.target.value = '';
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <ProductImageUploadBase
      imagePreview={imagePreview}
      isPending={uploadMutation.isPending}
      fileInputRef={fileInputRef}
      onFileChange={handleFileChange}
      onButtonClick={handleButtonClick}
    />
  );
};
