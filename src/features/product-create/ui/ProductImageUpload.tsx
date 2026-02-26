import { useState } from 'react';

import { ImagePlus } from 'lucide-react';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';

interface ProductImageUploadProps {
  onUploadComplete: (filenames: string[]) => void;
}

export const ProductImageUpload = ({ onUploadComplete }: ProductImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const uploadMutation = useUploadFiles();

  // 전체 영역 클릭 핸들러
  const handleAreaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        onUploadComplete(data.map((item) => item.filename));
      },
      onError: (error) => {
        if (error instanceof Error) alert('업로드 실패: ' + error.message);
        setImagePreview(null);
      },
    });

    e.target.value = '';
  };

  // 버튼 업로드 완료 시 미리보기 갱신은 불가 (버튼이 파일 객체를 외부에 노출 안 함)
  // filename만 전달받아 상위로 전달
  const handleButtonUploadComplete = (filename: string) => {
    onUploadComplete([filename]);
  };

  return (
    <div className="space-y-2">
      <label className="text-muted-foreground block text-sm">이미지 등록</label>

      <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
        {/* 이미지 업로드*/}
        <label className="hover:bg-muted/60 flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors">
          <input type="file" accept="image/*" className="hidden" onChange={handleAreaFileChange} />
          {imagePreview ? (
            <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <ImagePlus className="text-muted-foreground size-8" />
              <span className="text-muted-foreground text-sm">이미지를 선택하세요</span>
            </div>
          )}
        </label>

        {/* 이미지 업로드 버튼 */}
        <div className="absolute right-4 bottom-4 z-10" onClick={(e) => e.stopPropagation()}>
          <ImageFileButton
            onFileSelect={(file) => setImagePreview(URL.createObjectURL(file))}
            onUploadComplete={handleButtonUploadComplete}
            onUploadError={(error) => alert('업로드 실패: ' + error.message)}
            className="ring-offset-background border-border right-3 bottom-3 z-10 h-12 w-12 cursor-pointer border bg-white/60 backdrop-blur-sm transition-colors duration-200 hover:bg-white"
          />
        </div>
      </div>

      {uploadMutation.isPending && (
        <p className="text-muted-foreground text-xs">이미지 업로드 중...</p>
      )}
    </div>
  );
};
