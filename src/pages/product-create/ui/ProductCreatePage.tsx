import { useRef, useState } from 'react';

import { ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useProductMutation } from '@/entities/product';
import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { BackButton } from '@/shared/ui/BackButton';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

export const ProductCreatePage = () => {
  const navigate = useNavigate();

  // 상품 생성 mutation 가져오기
  // createMutation, updateMutation, deleteMutation 중에서
  // 우리는 createMutation만 사용
  const { createMutation } = useProductMutation();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    saleLink: '',
  });

  // 입력값 검증 에러 상태
  const [errors, setErrors] = useState({
    productName: '',
    price: '',
    saleLink: '',
  });

  // 이미지 미리보기 URL
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 서버 업로드 후 반환된 파일명 저장
  const [uploadedImageNames, setUploadedImageNames] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 이미지 업로드 mutation
  const uploadMutation = useUploadFiles();

  // 파일 선택창 열기
  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  // 이미지 선택 시 실행
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const file = files[0];

    // 1. 미리보기 생성
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // 2. 서버에 이미지 업로드
    uploadMutation.mutate(files, {
      onSuccess: (data) => {
        // 서버에서 filename 배열을 반환
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

  // 상품명 검증
  const validateProductName = (value: string) => {
    if (value.length < 2 || value.length > 15) {
      return '2~15자 이내여야 합니다.';
    }
    return '';
  };

  // 가격 검증
  const validatePrice = (value: string) => {
    if (!/^\d+$/.test(value)) {
      return '숫자만 입력 가능합니다.';
    }
    return '';
  };

  // 링크 검증
  const validateSaleLink = (value: string) => {
    if (!value) return '';
    try {
      const urlToValidate = value.startsWith('http') ? value : `https://${value}`;
      new URL(urlToValidate);
    } catch {
      return 'URL을 입력해 주세요.';
    }
    return '';
  };

  // 저장 버튼 클릭 시 실행
  const handleSave = () => {
    // 1. 모든 입력값 검증
    const nameError = validateProductName(formData.productName);
    const priceError = validatePrice(formData.price);
    const linkError = validateSaleLink(formData.saleLink);

    setErrors({
      productName: nameError,
      price: priceError,
      saleLink: linkError,
    });

    if (nameError || priceError || linkError) return;

    // 2. 이미지 업로드 여부 확인
    if (!uploadedImageNames.length) {
      alert('이미지를 업로드해 주세요.');
      return;
    }

    // 3. 서버에서 반환된 filename을
    //    API 스펙에 맞게 문자열로 변환
    // 예: "uploadFiles/123.png"
    const imageString = uploadedImageNames.map((name) => `uploadFiles/${name}`).join(',');

    // 4. productApi.createProduct에 전달할 객체 구성
    const productPayload = {
      itemName: formData.productName,
      price: Number(formData.price),
      link: formData.saleLink,
      itemImage: imageString,
    };

    // 5. 상품 생성 API 호출
    createMutation.mutate(productPayload, {
      onSuccess: () => {
        alert('상품이 등록되었습니다.');
        navigate(-1); // 이전 페이지로 이동
      },
      onError: (error) => {
        alert('등록 실패: ' + error.message);
      },
    });
  };

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            onClick={handleSave}
            disabled={createMutation.isPending}
            className="h-10 cursor-pointer rounded-full bg-[#6FCA3C]/50 px-6 py-1 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#5CB32A]"
          >
            {createMutation.isPending ? '저장 중...' : '저장'}
          </Button>
        }
      />

      <main className="bg-background flex-1 px-4 py-6">
        <form className="space-y-6">
          {/* 이미지 영역 */}
          <div className="space-y-2">
            <label className="text-muted-foreground block text-sm">이미지 등록</label>

            <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
              <div
                onClick={handleOpenFile}
                className="hover:bg-muted flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors"
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

              <ImageFileButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenFile();
                }}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
              placeholder="2~15자 이내여야 합니다"
              className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary mt-2 w-full border-b bg-transparent py-3 transition-colors focus:outline-none"
            />
            {errors.productName && <p className="text-sm text-red-500">{errors.productName}</p>}
          </div>

          {/* 가격 입력 */}
          <div>
            <label className="text-foreground text-sm font-medium">가격</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="숫자만 입력 가능합니다."
              className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary mt-2 w-full border-b bg-transparent py-3 transition-colors focus:outline-none"
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
          </div>

          {/* 링크 입력 */}
          <div>
            <label className="text-foreground text-sm font-medium">판매 링크</label>
            <input
              type="text"
              value={formData.saleLink}
              onChange={(e) => setFormData((prev) => ({ ...prev, saleLink: e.target.value }))}
              placeholder="URL을 입력해 주세요"
              className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary mt-2 w-full border-b bg-transparent py-3 transition-colors focus:outline-none"
            />
            {errors.saleLink && <p className="text-sm text-red-500">{errors.saleLink}</p>}
            <p className="text-muted-foreground mt-2 text-xs">
              선택 사항 (http:// 또는 https://로 시작)
            </p>
          </div>
        </form>
      </main>
    </>
  );
};
