import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useProductDetailQuery, useProductMutation } from '@/entities/product';
import { productUpdateSchema } from '@/features/product-update/model/schemas';
import { Button } from '@/shared/ui/button';

import { ProductUpdateFormFields } from './ProductUpdateFormFields';
import { ProductUpdateImageUpload } from './ProductUpdateImageUpload';

type ProductUpdateFormInput = z.input<typeof productUpdateSchema>;
type ProductUpdateFormOutput = z.output<typeof productUpdateSchema>;

// Header의 저장 버튼이 이 폼을 submit할 수 있도록 form id를 상수로 export
export const PRODUCT_UPDATE_FORM_ID = 'product-update-form';

interface ProductUpdateFormProps {
  productId: string;
  showSubmitButton?: boolean;
}

export const ProductUpdateForm = ({
  productId,
  showSubmitButton = false,
}: ProductUpdateFormProps) => {
  const navigate = useNavigate();
  const { updateMutation } = useProductMutation();

  // 기존 상품 데이터 조회
  const { data: product, isLoading, isError } = useProductDetailQuery(productId);

  // 기존 이미지 경로 상태 관리
  // - 새로 업로드하면 새 filename 배열로 교체
  // - 업로드 안 하면 기존 itemImage 그대로 유지
  const [uploadedImageNames, setUploadedImageNames] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductUpdateFormInput, undefined, ProductUpdateFormOutput>({
    resolver: zodResolver(productUpdateSchema),
    mode: 'onChange',
  });

  // 상품 데이터 로드 후 폼 초기값 세팅
  useEffect(() => {
    if (!product) return;

    reset({
      productName: product.itemName,
      // price는 string input이므로 toLocaleString으로 포맷해서 넣어줌
      price: product.price.toLocaleString(),
      saleLink: product.link ?? '',
    });
  }, [product, reset]);

  const onSubmit: SubmitHandler<ProductUpdateFormOutput> = (data) => {
    // 새로 업로드한 이미지가 있으면 새 경로, 없으면 기존 itemImage 유지
    const itemImage =
      uploadedImageNames !== null
        ? uploadedImageNames.map((name) => `uploadFiles/${name}`).join(',')
        : (product?.itemImage ?? '');

    if (!itemImage) {
      alert('이미지를 업로드해 주세요.');
      return;
    }

    const productPayload = {
      itemName: data.productName,
      price: data.price,
      itemImage,
      link: data.saleLink ?? '',
    };

    updateMutation.mutate(
      { productId, product: productPayload },
      {
        onSuccess: () => {
          alert('상품이 수정되었습니다.');
          navigate(-1);
        },
        onError: (error) => {
          if (error instanceof Error) {
            alert('수정 실패: ' + error.message);
          }
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-muted-foreground text-sm">상품 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-sm text-red-500">상품 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  // itemImage 첫 번째 경로를 초기 미리보기로 사용
  const initialImage = product.itemImage?.split(',')[0];

  return (
    <form id={PRODUCT_UPDATE_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 이미지 업로드 (기존 이미지 미리보기 포함) */}
      <ProductUpdateImageUpload
        initialImage={initialImage}
        onUploadComplete={setUploadedImageNames}
      />

      {/* 폼 필드 (기존 값 자동 세팅) */}
      <ProductUpdateFormFields register={register} errors={errors} />

      {showSubmitButton && (
        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="h-10 w-full cursor-pointer rounded-full bg-[#6FCA3C]/50 text-sm font-medium text-white transition-colors hover:bg-[#5CB32A]"
        >
          {updateMutation.isPending ? '저장 중...' : '저장'}
        </Button>
      )}
    </form>
  );
};
