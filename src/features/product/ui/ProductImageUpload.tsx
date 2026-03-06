import { useRef, useState } from 'react';

import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { imageUrl } from '@/shared/lib/imageUrl';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';

interface ProductImageUploadProps {
  initialImage?: string; // update일 때만 넘겨줌, create는 안 넘겨도 됨
  onUploadComplete: (filenames: string[]) => void;
}

export const ProductImageUpload = ({ initialImage, onUploadComplete }: ProductImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImage ? imageUrl(initialImage) : null, // 있으면 기존 이미지, 없으면 null
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

  // ↓ ProductImageUploadBase 내용을 직접 여기에 씀
  return (
    <div className="space-y-2">
      <label className="text-muted-foreground block text-sm">이미지 등록</label>

      {/* 숨겨진 파일 input (버튼 클릭 시 트리거됨) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
        <div
          className="hover:bg-muted/60 flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors"
          onClick={handleButtonClick}
        >
          {/* 이미지 미리보기가 있으면 보여주고, 없으면 아이콘 표시 */}
          {imagePreview ? (
            <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <ImagePlus className="text-muted-foreground size-8" />
              <span className="text-muted-foreground text-sm">이미지를 선택하세요</span>
            </div>
          )}
        </div>

        {/* 우측 하단 이미지 변경 버튼 */}
        <ImageFileButton
          onClick={(e) => {
            e.stopPropagation(); // 부모 div의 onClick이 같이 실행되는 걸 막음
            handleButtonClick();
          }}
          className="border-border right-4 bottom-4 h-12 w-12 border bg-white/60 backdrop-blur-sm hover:bg-white"
        />
      </div>

      {/* 업로드 중일 때 텍스트 표시 */}
      {uploadMutation.isPending && (
        <p className="text-muted-foreground text-xs">이미지 업로드 중...</p>
      )}
    </div>
  );
};
