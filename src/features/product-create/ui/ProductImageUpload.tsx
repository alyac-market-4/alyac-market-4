import { useRef, useState } from 'react';

import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';

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
    <div className="space-y-2">
      <label className="text-muted-foreground block text-sm">이미지 등록</label>

      {/* 숨겨진 파일 input (하나만 존재) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
        {/* 전체 영역 - label 대신 div+onClick으로 호버 독립 */}
        <div
          className="hover:bg-muted/60 flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors"
          onClick={handleButtonClick}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <ImagePlus className="text-muted-foreground size-8" />
              <span className="text-muted-foreground text-sm">이미지를 선택하세요</span>
            </div>
          )}
        </div>

        {/* 버튼 - 별도 호버, 클릭 시 같은 input 트리거 */}
        <ImageFileButton
          onClick={(e) => {
            e.stopPropagation(); // 영역 클릭 이벤트 전파 차단
            handleButtonClick();
          }}
          className="border-border right-4 bottom-4 h-12 w-12 border bg-white/60 backdrop-blur-sm hover:bg-white"
        />
      </div>

      {uploadMutation.isPending && (
        <p className="text-muted-foreground text-xs">이미지 업로드 중...</p>
      )}
    </div>
  );
};
