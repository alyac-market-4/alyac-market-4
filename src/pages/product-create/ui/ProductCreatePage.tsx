import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCreateProduct } from '@/entities/product';
import { PRODUCT_FORM_ID, ProductForm } from '@/features/product';
import { BackButton, Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProductCreatePage = () => {
  const navigate = useNavigate();

  // useCreateProduct - 상품 등록 API를 TanStack Query mutation으로 감싼 훅
  // mutate    - 실제 API 호출 함수 (호출하면 서버에 POST 요청)
  // isPending - API 응답 기다리는 중이면 true (버튼 비활성화, 중복 제출 방지)
  const { mutate: productCreate, isPending: isProductCreatePending } = useCreateProduct();

  // ProductForm 안에서 폼 유효성이 바뀔 때마다 여기로 올라옴
  // true면 저장 버튼 활성화, false면 비활성화
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            variant="alyac"
            type="submit"
            form={PRODUCT_FORM_ID}
            // form 속성 - 버튼이 헤더에 있어서 form 태그 밖에 있어도
            // form="product-form"으로 연결하면 해당 폼을 제출할 수 있음
            disabled={isProductCreatePending || !isFormValid}
          >
            {isProductCreatePending ? '저장 중...' : '저장'}
          </Button>
        }
      />

      <main className="bg-background flex-1 px-4 py-6">
        <ProductForm
          onValidChange={setIsFormValid}
          onSubmit={(data, uploadedImageNames) => {
            // 이미지 없으면 제출 차단 (isFormValid에서도 막히지만 이중 방어)
            if (!uploadedImageNames.length) {
              toast.info('이미지를 업로드 해주세요.');
              return;
            }

            productCreate(
              {
                itemName: data.productName,
                price: data.price, // zod transform에서 number로 변환된 값
                itemImage: uploadedImageNames.join(','), // 단일 이미지지만 서버 스펙상 콤마 구분 형식
                link: data.saleLink ?? '',
              },
              {
                onSuccess: () => {
                  toast.success('상품이 등록되었습니다.');
                  navigate(-1);
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
