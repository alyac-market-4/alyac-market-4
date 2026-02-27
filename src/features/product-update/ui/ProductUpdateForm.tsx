import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useProductDetailQuery, useProductMutation } from '@/entities/product';
import { productUpdateSchema } from '@/features/product-update/model/schemas';
import { ProductFormBase } from '@/shared/ui/ProductFormBase';

import { ProductUpdateFormFields } from './ProductUpdateFormFields';
import { ProductUpdateImageUpload } from './ProductUpdateImageUpload';

type ProductUpdateFormInput = z.input<typeof productUpdateSchema>;
type ProductUpdateFormOutput = z.output<typeof productUpdateSchema>;

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
  const { data: product, isLoading, isError } = useProductDetailQuery(productId);
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
      price: product.price.toLocaleString(),
      saleLink: product.link ?? '',
    });
  }, [product, reset]);

  const onSubmit: SubmitHandler<ProductUpdateFormOutput> = (data) => {
    const itemImage =
      uploadedImageNames !== null
        ? uploadedImageNames.map((name) => `uploadFiles/${name}`).join(',')
        : (product?.itemImage ?? '');

    if (!itemImage) {
      toast.info('이미지를 업로드 해주세요.');
      return;
    }

    updateMutation.mutate(
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

  const initialImage = product.itemImage?.split(',')[0];

  return (
    <ProductFormBase
      formId={PRODUCT_UPDATE_FORM_ID}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isPending={updateMutation.isPending}
      showSubmitButton={showSubmitButton}
      imageUploadSlot={
        <ProductUpdateImageUpload
          initialImage={initialImage}
          onUploadComplete={setUploadedImageNames}
        />
      }
      formFieldsSlot={<ProductUpdateFormFields register={register} errors={errors} />}
    />
  );
};
