import { useRef, useState } from 'react';

import { ImagePlus } from 'lucide-react';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { imageUrl } from '@/shared/lib';
import { BackButton } from '@/shared/ui/BackButton';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

// import { useCreatePost } from '@/entities/post/hooks/useCreatePost'; ← 프로젝트에 맞게 수정 필요

export const ProductPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageNames, setUploadedImageNames] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadMutation = useUploadFiles();
  // const createPostMutation = useCreatePost(); ← 프로젝트에 맞게 수정 필요

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const file = files[0];

    // 미리보기
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // 서버 업로드
    uploadMutation.mutate(files, {
      onSuccess: (data) => {
        const filenames = data.map((item) => item.filename);
        setUploadedImageNames(filenames);
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          alert('업로드 실패: ' + error.message);
        }
      },
    });
  };

  const handleSubmit = () => {
    const imageString = uploadedImageNames.join(',');

    console.log('서버에 보낼 이미지 문자열:', imageString);

    // createPostMutation.mutate({
    //   content: 'Hello',
    //   image: imageString,
    // });
  };

  return (
    <>
      {/* 헤더 */}
      <Header
        left={<BackButton />}
        right={
          <Button
            onClick={handleSubmit}
            type="submit"
            form="product-form"
            className="ring-offset-background focus-visible:ring-ring inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#6FCA3C] px-6 py-1 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#5CB32A] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
          >
            저장
          </Button>
        }
      />

      <main className="flex-1 px-4 py-6">
        <form id="product-form" className="space-y-6">
          {/* 이미지 등록 섹션 */}
          <div className="space-y-2">
            <label className="text-muted-foreground block text-sm">이미지 등록</label>

            {/* 이미지 등록 */}
            <div
              onClick={handleOpenFile}
              className="relative h-64 w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-800 transition-colors duration-200 hover:bg-gray-700"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <ImagePlus className="mb-2 size-8 text-gray-400" />
                  <span className="text-sm text-gray-400">이미지를 선택하세요</span>
                </div>
              )}

              {/* 아이콘 버튼 */}
              <ImageFileButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenFile();
                }}
                className="cursor-pointer bg-white/60 text-gray-700 transition-colors duration-200 hover:bg-white"
              />
            </div>

            <input
              ref={fileInputRef}
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </form>
      </main>
    </>
  );
};
