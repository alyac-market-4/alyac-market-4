import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCreateProduct } from '@/entities/product';
import { PRODUCT_FORM_ID, ProductForm } from '@/features/product';
import { BackButton, Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProductCreatePage = () => {
  const navigate = useNavigate(); // 페이지 이동 함수

  // 상품 등록 API 호출 함수와 로딩 상태
  // mutate → 실제 API 호출하는 함수
  // isPending → API 호출 중이면 true (저장 중... 표시할 때 사용)
  const { mutate: productCreate, isPending: isProductCreatePending } = useCreateProduct();

  // 폼이 유효한지(저장 버튼 활성화 여부) 상태
  // ProductForm 안에서 isFormValid가 바뀔 때마다 여기로 올려줌
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <>
      {/* 상단 헤더: 뒤로가기 버튼 + 저장 버튼 */}
      <Header
        left={<BackButton />}
        right={
          <Button
            variant="alyac"
            type="submit"
            form={PRODUCT_FORM_ID} // 이 버튼이 어떤 폼을 제출할지 연결 (폼 밖에 있어도 작동)
            disabled={isProductCreatePending || !isFormValid} // 저장 중이거나 폼 미완성이면 비활성화
          >
            {isProductCreatePending ? '저장 중...' : '저장'}
          </Button>
        }
      />

      <main className="bg-background flex-1 px-4 py-6">
        <ProductForm
          // 폼 유효성이 바뀔 때마다 setIsFormValid 호출 → 저장 버튼 활성화/비활성화
          onValidChange={setIsFormValid}
          // API 호출 중 여부 → 폼 내부에서 중복 제출 방지에 사용
          isPending={isProductCreatePending}
          // 폼 제출 시 실행되는 함수
          // data → 폼 입력값 (productName, price, saleLink)
          // uploadedImageNames → 업로드된 이미지 파일명 배열
          onSubmit={(data, uploadedImageNames) => {
            // 이미지가 없으면 제출 막기
            if (!uploadedImageNames.length) {
              toast.info('이미지를 업로드 해주세요.');
              return;
            }

            // 상품 등록 API 호출
            productCreate(
              {
                itemName: data.productName,
                price: data.price, // 스키마에서 number로 변환된 값
                itemImage: uploadedImageNames.join(','), // 이미지 여러 장이면 콤마로 연결
                link: data.saleLink ?? '', // saleLink가 없으면 빈 문자열
              },
              {
                onSuccess: () => {
                  toast.success('상품이 등록되었습니다.');
                  navigate(-1); // 이전 페이지로 이동
                },
                onError: () => {
                  toast.error('상품 등록에 실패했습니다.');
                },
              },
            );
          }}
        />
      </main>
    </>
  );
};
