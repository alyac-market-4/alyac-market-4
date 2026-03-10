import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useDetailProduct, useUpdateProduct } from '@/entities/product';
import { PRODUCT_FORM_ID, ProductForm } from '@/features/product';
import { splitImageSegments } from '@/shared/lib';
import { BackButton, Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProductUpdatePage = () => {
  // URL 파라미터에서 productId 꺼내기
  // 예: /product/123/edit → productId = "123"
  const { productId } = useParams<{ productId: string }>();

  const navigate = useNavigate();

  // useUpdateProduct - 상품 수정 API를 TanStack Query mutation으로 감싼 훅
  const { mutate: productUpdate, isPending: isProductUpdatePending } = useUpdateProduct();

  // useDetailProduct - productId로 기존 상품 데이터 불러오는 쿼리 훅
  // isLoading - 처음 불러오는 중
  // isError   - 불러오기 실패
  // data      - 불러온 상품 정보 (itemName, price, itemImage, link)
  const { data: product, isLoading, isError } = useDetailProduct(productId!);
  // productId! - "이 시점에 productId는 절대 undefined가 아니다"는 TypeScript 단언

  // 폼 유효성 상태 - ProductForm에서 올라오는 값으로 저장 버튼 활성화 여부 결정
  const [isFormValid, setIsFormValid] = useState(false);

  // URL에 productId가 없는 경우 (잘못된 접근 방어)
  if (!productId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-red-500">잘못된 접근입니다.</p>
      </div>
    );
  }

  // 상품 데이터 불러오는 중 - 폼이 빈 채로 보이는 걸 막음
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-muted-foreground text-sm">상품 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 상품 데이터 불러오기 실패 or 데이터 없음
  if (isError || !product) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-sm text-red-500">상품 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  // 이미지가 콤마로 연결된 경우 첫 번째 이미지만 꺼냄
  // 예: "img1.jpg,img2.jpg" → "img1.jpg"
  // (현재 앱에서 이미지는 1장이지만 서버 스펙상 콤마 구분 형식)
  const initialImage = splitImageSegments(product.itemImage)[0];

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            variant="alyac"
            type="submit"
            form={PRODUCT_FORM_ID}
            disabled={isProductUpdatePending || !isFormValid}
          >
            {isProductUpdatePending ? '저장 중...' : '저장'}
          </Button>
        }
      />

      <main className="bg-background flex-1 px-4 py-6">
        <ProductForm
          onValidChange={setIsFormValid}
          // 기존 상품 데이터를 폼 초기값으로 넣어줌
          // ProductForm 내부에서 useEffect + reset으로 API 데이터가 늦게 와도 폼에 채워짐
          defaultValues={{
            productName: product.itemName,
            price: product.price.toString(), // 폼 input은 string만 받으므로 변환
            saleLink: product.link ?? '',
          }}
          initialImage={initialImage}
          onSubmit={(data, uploadedImageNames) => {
            // 새로 업로드한 이미지가 있으면 그걸 쓰고
            // 없으면 기존 이미지(product.itemImage) 그대로 사용 (수정 안 한 경우)
            const itemImage =
              uploadedImageNames.length > 0
                ? uploadedImageNames.join(',')
                : (product.itemImage ?? '');

            // 이미지가 아예 없으면 제출 차단
            if (!itemImage) {
              toast.info('이미지를 업로드 해주세요.');
              return;
            }

            productUpdate(
              {
                productId,
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
                  navigate(-1);
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
