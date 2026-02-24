import { useRef, useState } from 'react';

import { ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useProductMutation } from '@/entities/product';
import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { BackButton } from '@/shared/ui/BackButton';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

// 폼 데이터 타입 정의
// - formData의 구조를 명확하게 타입으로 고정
// - 추후 필드 추가/수정 시 타입 오류로 빠르게 감지 가능
interface FormState {
  productName: string; // 상품명 (2~15자)
  price: string; // 숫자 문자열로 관리 (input은 항상 string)
  saleLink: string; // 선택 입력 URL
}

// 에러 상태 타입 정의
// - 각 필드별 에러 메시지를 문자열로 관리
// - 에러가 없으면 빈 문자열 ''
interface FormErrors {
  productName: string;
  price: string;
  saleLink: string;
}

export const ProductCreatePage = () => {
  // 라우터 이동 훅
  // - 저장 성공 시 이전 페이지로 이동하기 위해 사용
  const navigate = useNavigate();

  // 상품 생성 mutation
  // - 서버에 상품 생성 요청 보내는 역할
  const { createMutation } = useProductMutation();

  // 파일 업로드 mutation
  // - 이미지 업로드 전용 API 호출 역할
  const uploadMutation = useUploadFiles();

  // 숨겨진 파일 input 제어용 ref
  // - 커스텀 버튼 클릭 시 실제 input을 강제로 클릭시키기 위해 사용
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 폼 상태
  // - 입력값을 하나의 객체로 관리
  // - 확장성 + 상태 관리 일관성 확보
  const [formData, setFormData] = useState<FormState>({
    productName: '',
    price: '',
    saleLink: '',
  });

  // 에러 상태
  // - validate 실행 후 결과를 저장
  // - UI에 즉시 반영됨
  const [errors, setErrors] = useState<FormErrors>({
    productName: '',
    price: '',
    saleLink: '',
  });

  // 선택한 이미지 미리보기 URL
  // - URL.createObjectURL로 생성된 임시 URL 저장
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 서버 업로드 후 반환된 filename 저장
  // - 실제 API 전송 시 사용
  const [uploadedImageNames, setUploadedImageNames] = useState<string[]>([]);

  // 유효성 검사 로직
  // - 필드별 validator를 객체로 분리
  // - 가독성 + 확장성 확보
  const validators = {
    // 상품명: 2~15자
    productName: (value: string) =>
      value.length < 2 || value.length > 15 ? '2~15자 이내여야 합니다.' : '',

    // 가격: 숫자만 허용
    price: (value: string) => (/^\d+$/.test(value) ? '' : '숫자만 입력 가능합니다.'),

    // 링크: 선택 입력이지만 URL 형식이어야 함
    saleLink: (value: string) => {
      if (!value) return ''; // 선택이므로 비어있으면 통과

      try {
        // http가 없으면 https 자동 보정
        const url = value.startsWith('http') ? value : `https://${value}`;
        new URL(url); // URL 생성 시도 → 실패하면 catch
        return '';
      } catch {
        return 'URL을 입력해 주세요.';
      }
    },
  };

  // 전체 폼 검증 함수
  // - 각 validator 실행
  // - 에러 상태 업데이트
  // - 에러가 하나라도 있으면 false 반환
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      productName: validators.productName(formData.productName),
      price: validators.price(formData.price),
      saleLink: validators.saleLink(formData.saleLink),
    };

    setErrors(newErrors);

    // 하나라도 true(에러 존재)면 저장 중단
    return !Object.values(newErrors).some(Boolean);
  };

  // 이미지 처리
  // 숨겨진 input 강제 클릭
  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시 실행
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. 미리보기 생성
    setImagePreview(URL.createObjectURL(file));

    // 2. 서버 업로드
    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        // 서버에서 받은 filename 배열 저장
        setUploadedImageNames(data.map((item) => item.filename));
      },
      onError: (error) => {
        if (error instanceof Error) {
          alert('업로드 실패: ' + error.message);
        }
      },
    });
  };

  // 저장 처리
  const handleSave = () => {
    // 1. 폼 검증
    if (!validateForm()) return;

    // 2. 이미지 업로드 여부 확인
    if (!uploadedImageNames.length) {
      alert('이미지를 업로드해 주세요.');
      return;
    }

    // 3. API 스펙에 맞게 payload 구성
    const productPayload = {
      itemName: formData.productName,
      price: Number(formData.price), // 문자열 → 숫자 변환
      link: formData.saleLink,
      itemImage: uploadedImageNames.map((name) => `uploadFiles/${name}`).join(','), // 문자열 형태로 변환
    };

    // 4. 상품 생성 요청
    createMutation.mutate(productPayload, {
      onSuccess: () => {
        alert('상품이 등록되었습니다.');
        navigate(-1); // 이전 페이지로 이동
      },
      onError: (error) => {
        if (error instanceof Error) {
          alert('등록 실패: ' + error.message);
        }
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
