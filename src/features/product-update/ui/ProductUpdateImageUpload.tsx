import { useRef, useState } from 'react';

import { toast } from 'sonner';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { imageUrl } from '@/shared/lib/imageUrl';
import { ProductImageUploadBase } from '@/shared/ui/ProductImageUploadBase';

interface ProductUpdateImageUploadProps {
  initialImage?: string; // 추가
  onUploadComplete: (filenames: string[]) => void;
}

export const ProductUpdateImageUpload = ({
  initialImage, // 추가
  onUploadComplete,
}: ProductUpdateImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImage ? imageUrl(initialImage) : null, // 기존 이미지 초기값
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
        setImagePreview(initialImage ? imageUrl(initialImage) : null); // 실패 시 기존 이미지로 복구
      },
    });
    e.target.value = '';
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <ProductImageUploadBase // 공통 UI 사용
      imagePreview={imagePreview}
      isPending={uploadMutation.isPending}
      fileInputRef={fileInputRef}
      onFileChange={handleFileChange}
      onButtonClick={handleButtonClick}
    />
  );
};
