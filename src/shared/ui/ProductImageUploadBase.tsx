// shared/ui/ProductImageUploadBase.tsx
import { ImagePlus } from 'lucide-react';

import { ImageFileButton } from './ImageFileButton';

interface ProductImageUploadBaseProps {
  imagePreview: string | null;
  isPending: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

export const ProductImageUploadBase = ({
  imagePreview,
  isPending,
  fileInputRef,
  onFileChange,
  onButtonClick,
}: ProductImageUploadBaseProps) => {
  return (
    <div className="space-y-2">
      <label className="text-muted-foreground block text-sm">이미지 등록</label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
        <div
          className="hover:bg-muted/60 flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors"
          onClick={onButtonClick}
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

        <ImageFileButton
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick();
          }}
          className="border-border right-4 bottom-4 h-12 w-12 border bg-white/60 backdrop-blur-sm hover:bg-white"
        />
      </div>

      {isPending && <p className="text-muted-foreground text-xs">이미지 업로드 중...</p>}
    </div>
  );
};
