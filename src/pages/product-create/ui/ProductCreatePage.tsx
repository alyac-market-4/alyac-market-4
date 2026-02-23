import { useRef, useState } from 'react';

import { ImagePlus } from 'lucide-react';

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
// import { imageUrl } from '@/shared/lib';
import { BackButton } from '@/shared/ui/BackButton';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

// import { useCreatePost } from '@/entities/post/hooks/useCreatePost'; ← 프로젝트에 맞게 수정 필요

export const ProductCreatePage = () => {
  // 1. 상태 관리 - 폼 데이터를 저장합니다
  const [formData, setFormData] = useState({
    image: null as File | null,
    productName: '',
    price: '',
    saleLink: '',
  });

  // 2. 에러 메시지 상태
  const [errors, setErrors] = useState({
    productName: '',
    price: '',
    saleLink: '',
  });

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

  // 4. 상품명 검증 함수
  const validateProductName = (value: string) => {
    if (value.length < 2 || value.length > 15) {
      return '2~15자 이내여야 합니다.';
    }
    return '';
  };

  // 5. 가격 검증 함수 (숫자만 가능)
  const validatePrice = (value: string) => {
    if (value && !/^\d+$/.test(value)) {
      return '숫자만 입력 가능합니다.';
    }
    return '';
  };

  // 6. URL 검증 함수
  const validateSaleLink = (value: string) => {
    if (value) {
      try {
        // http/https가 없으면 추가
        const urlToValidate = value.startsWith('http') ? value : `https://${value}`;
        new URL(urlToValidate);
      } catch {
        return 'URL을 입력해 주세요.';
      }
    }
    return '';
  };

  // 7. 상품명 입력 변경 처리
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, productName: value }));
    const error = validateProductName(value);
    setErrors((prev) => ({ ...prev, productName: error }));
  };

  // 8. 가격 입력 변경 처리
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, price: value }));
    const error = validatePrice(value);
    setErrors((prev) => ({ ...prev, price: error }));
  };

  // 9. 판매 링크 입력 변경 처리
  const handleSaleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, saleLink: value }));
    const error = validateSaleLink(value);
    setErrors((prev) => ({ ...prev, saleLink: error }));
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
            className="h-10 cursor-pointer rounded-full bg-[#6FCA3C]/50 px-6 py-1 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#5CB32A]"
            // className="bg-primary text-primary-foreground h-10 cursor-pointer rounded-full px-6 transition"
          >
            저장
          </Button>
        }
      />

      <main className="bg-background flex-1 px-4 py-6">
        <form id="product-form" className="space-y-6">
          {/* 이미지 등록 섹션 */}
          <div className="space-y-2">
            <label className="text-muted-foreground block text-sm">이미지 등록</label>

            {/* 이미지 등록 */}
            <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
              <div
                onClick={handleOpenFile}
                className="hover:bg-muted flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors"
                // className="h-full w-full cursor-pointer transition-colors duration-200 hover:bg-gray-700"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="상품 이미지"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <ImagePlus className="text-muted-foreground mb-2 size-8" />
                    <span className="text-muted-foreground text-sm">이미지를 선택하세요</span>
                  </div>
                )}
              </div>

              {/* 이미지 등록 - 아이콘 버튼 */}
              <ImageFileButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenFile();
                }}
                // className="bg-background/80 border-border hover:bg-muted right-4 bottom-4 z-10 cursor-pointer border backdrop-blur-sm"
                className="ring-offset-background border-border right-4 bottom-4 z-10 h-10 w-10 cursor-pointer border bg-white/60 backdrop-blur-sm transition-colors duration-200 hover:bg-white"
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

          {/* 상품명 입력 */}
          <div>
            <label className="text-foreground text-sm font-medium">상품명</label>
            <input
              type="text"
              value={formData.productName}
              onChange={handleProductNameChange}
              placeholder="2~15자 이내여야 합니다"
              className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary mt-2 w-full border-b bg-transparent py-3 transition-colors focus:outline-none"
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-500">{errors.productName}</p>
            )}
          </div>

          {/* 가격 입력 */}
          <div>
            <label className="text-foreground text-sm font-medium">가격</label>
            <input
              type="text"
              value={formData.price}
              onChange={handlePriceChange}
              placeholder="숫자만 입력 가능합니다."
              className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary mt-2 w-full border-b bg-transparent py-3 transition-colors focus:outline-none"
            />
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          </div>

          {/* 판매 링크 입력 */}
          <div>
            <label className="text-foreground text-sm font-medium">판매 링크</label>
            <input
              type="text"
              value={formData.saleLink}
              onChange={handleSaleLinkChange}
              placeholder="URL을 입력해 주세요"
              className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary mt-2 w-full border-b bg-transparent py-3 transition-colors focus:outline-none"
            />
            {errors.saleLink && <p className="mt-1 text-sm text-red-500">{errors.saleLink}</p>}
            <p className="text-muted-foreground mt-2 text-xs">
              선택 사항 (http:// 또는 https://로 시작)
            </p>
          </div>
        </form>
      </main>
    </>
  );
};
