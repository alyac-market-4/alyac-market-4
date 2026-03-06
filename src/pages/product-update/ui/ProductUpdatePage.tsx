import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useDetailProduct, useUpdateProduct } from '@/entities/product';
import { PRODUCT_FORM_ID, ProductForm } from '@/features/product';
import { splitImageSegments } from '@/shared/lib';
import { BackButton, Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProductUpdatePage = () => {
  // URL에서 productId 꺼내기 (예: /product/123 → productId = "123")
  const { productId } = useParams<{ productId: string }>();

  const navigate = useNavigate(); // 페이지 이동 함수

  // 상품 수정 API 호출 함수와 로딩 상태
  const { mutate: productUpdate, isPending: isProductUpdatePending } = useUpdateProduct();

  // productId로 기존 상품 데이터 불러오기
  // data → 상품 정보 (itemName, price, itemImage, link)
  // isLoading → 불러오는 중이면 true
  // isError → 불러오기 실패하면 true
  const { data: product, isLoading, isError } = useDetailProduct(productId!);
  // productId! → "productId가 undefined가 아님을 확신한다"는 TypeScript 문법

  // 폼이 유효한지(저장 버튼 활성화 여부) 상태
  const [isFormValid, setIsFormValid] = useState(false);

  // productId가 URL에 없는 경우 (잘못된 접근)
  if (!productId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-red-500">잘못된 접근입니다.</p>
      </div>
    );
  }

  // 상품 데이터 불러오는 중
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-muted-foreground text-sm">상품 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 상품 데이터 불러오기 실패
  if (isError || !product) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-sm text-red-500">상품 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  // 이미지가 여러 장 콤마로 연결된 경우 첫 번째 이미지만 꺼내기
  // 예: "img1.jpg,img2.jpg" → "img1.jpg"
  const initialImage = splitImageSegments(product.itemImage)[0];

  return (
    <>
      {/* 상단 헤더: 뒤로가기 버튼 + 저장 버튼 */}
      <Header
        left={<BackButton />}
        right={
          <Button
            variant="alyac"
            type="submit"
            form={PRODUCT_FORM_ID} // 이 버튼이 어떤 폼을 제출할지 연결
            disabled={isProductUpdatePending || !isFormValid} // 저장 중이거나 폼 미완성이면 비활성화
          >
            {isProductUpdatePending ? '저장 중...' : '저장'}
          </Button>
        }
      />

      <main className="bg-background flex-1 px-4 py-6">
        <ProductForm
          // 폼 유효성이 바뀔 때마다 setIsFormValid 호출 → 저장 버튼 활성화/비활성화
          onValidChange={setIsFormValid}
          // API 호출 중 여부
          isPending={isProductUpdatePending}
          // 기존 상품 데이터를 폼 초기값으로 넣어주기 (수정 폼이니까 기존 값이 채워져야 함)
          defaultValues={{
            productName: product.itemName,
            price: product.price.toString(), // 숫자 → 문자열로 변환 (폼 input은 string)
            saleLink: product.link ?? '', // link가 null이면 빈 문자열
          }}
          // 기존 이미지 미리보기용 (수정 시 기존 이미지가 보여야 함)
          initialImage={initialImage}
          // 폼 제출 시 실행되는 함수
          onSubmit={(data, uploadedImageNames) => {
            // 새로 업로드한 이미지가 있으면 그걸 쓰고,
            // 없으면 기존 이미지(product.itemImage) 그대로 사용
            const itemImage =
              uploadedImageNames.length > 0
                ? uploadedImageNames.join(',')
                : (product.itemImage ?? '');

            // 이미지가 아예 없으면 제출 막기
            if (!itemImage) {
              toast.info('이미지를 업로드 해주세요.');
              return;
            }

            // 상품 수정 API 호출
            productUpdate(
              {
                productId, // 어떤 상품을 수정할지 ID 전달
                product: {
                  itemName: data.productName,
                  price: data.price,
                  itemImage,
                  link: data.saleLink ?? '',
                },
              },
              {
                onSuccess: () => {
                  toast.success('상품이 수정되었습니다.');
                  navigate(-1); // 이전 페이지로 이동
                },
                onError: () => {
                  toast.error('상품 수정에 실패했습니다.');
                },
              },
            );
          }}
        />
      </main>
    </>
  );
};
