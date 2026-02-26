import { useRef, useState } from 'react';

import { ImagePlus } from 'lucide-react';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';

interface ProductImageUploadProps {
  onUploadComplete: (filenames: string[]) => void;
}

export const ProductImageUpload = ({ onUploadComplete }: ProductImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const uploadMutation = useUploadFiles();

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        onUploadComplete(data.map((item) => item.filename));
      },
      onError: (error) => {
        if (error instanceof Error) {
          alert('업로드 실패: ' + error.message);
        }
        setImagePreview(null);
      },
    });
  };

  return (
    <div className="space-y-2">
      <label className="text-muted-foreground block text-sm">이미지 등록</label>

      <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
        <div
          onClick={handleOpenFile}
          className="hover:bg-muted flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors"
        >
          {imagePreview ? (
            <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <ImagePlus className="text-muted-foreground mb-2 size-8" />
              <span className="text-muted-foreground text-sm">이미지를 선택하세요</span>
            </div>
          )}
        </div>

        <ImageFileButton
          onClick={(e) => {
            e.stopPropagation();
            handleOpenFile();
          }}
          className="ring-offset-background border-border right-4 bottom-4 z-10 h-10 w-10 cursor-pointer border bg-white/60 backdrop-blur-sm transition-colors duration-200 hover:bg-white"
        />
      </div>

      {uploadMutation.isPending && (
        <p className="text-muted-foreground text-xs">이미지 업로드 중...</p>
      )}

      <input
        ref={fileInputRef}
        onChange={handleImageChange}
        type="file"
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
