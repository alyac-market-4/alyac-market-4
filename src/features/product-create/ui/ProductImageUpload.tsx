import { useRef, useState } from 'react';

import { toast } from 'sonner';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { ProductImageUploadBase } from '@/shared/ui/ProductImageUploadBase';

interface ProductImageUploadProps {
  onUploadComplete: (filenames: string[]) => void;
}

export const ProductImageUpload = ({ onUploadComplete }: ProductImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
        setImagePreview(null);
      },
    });

    e.target.value = '';
  };

  // 버튼 클릭 시 숨겨진 input을 트리거
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
