import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useProductDetail, useProductUpdate } from '@/entities/product';
import { splitImageSegments } from '@/shared/lib';
import { ProductFormBase } from '@/shared/ui';

import { productUpdateSchema } from '../model/schemas';
import { ProductUpdateFormFields } from './ProductUpdateFormFields';
import { ProductUpdateImageUpload } from './ProductUpdateImageUpload';

type ProductUpdateFormInput = z.input<typeof productUpdateSchema>;
type ProductUpdateFormOutput = z.output<typeof productUpdateSchema>;

export const PRODUCT_UPDATE_FORM_ID = 'product-update-form';

interface ProductUpdateFormProps {
  productId: string;
  showSubmitButton?: boolean;
  onValidChange?: (isValid: boolean) => void;
}

export const ProductUpdateForm = ({
  productId,
  showSubmitButton = false,
  onValidChange,
}: ProductUpdateFormProps) => {
  const navigate = useNavigate();
  const { mutate: productUpdate, isPending: isProductUpdatePending } = useProductUpdate();
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const [uploadedImageNames, setUploadedImageNames] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductUpdateFormInput, undefined, ProductUpdateFormOutput>({
    resolver: zodResolver(productUpdateSchema),
    mode: 'onChange',
  });

  // 상품 데이터 로드 후 폼 초기값 세팅
  // toLocaleString() 대신 toString() → 콤마 없는 숫자만 저장
  useEffect(() => {
    if (!product) return;
    reset({
      productName: product.itemName,
      price: product.price.toString(),
      saleLink: product.link ?? '',
    });
  }, [product, reset]);

  const productName = useWatch({ control, name: 'productName' });
  const price = useWatch({ control, name: 'price' });

  const currentImage =
    uploadedImageNames !== null ? uploadedImageNames.length > 0 : !!product?.itemImage;

  // 버튼 활성화 조건
  const isFormValid =
    !errors.productName &&
    !errors.price &&
    !errors.saleLink &&
    (productName?.trim().length ?? 0) >= 2 &&
    (price?.trim().length ?? 0) > 0 &&
    currentImage;

  // 부모(ProductUpdatePage)에 활성화 상태 전달
  useEffect(() => {
    onValidChange?.(isFormValid);
  }, [isFormValid, onValidChange]);

  const onSubmit: SubmitHandler<ProductUpdateFormOutput> = (data) => {
    const itemImage =
      uploadedImageNames !== null ? uploadedImageNames.join(',') : (product?.itemImage ?? '');

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

  const initialImage = splitImageSegments(product.itemImage)[0];

  return (
    <ProductFormBase
      formId={PRODUCT_UPDATE_FORM_ID}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isPending={isProductUpdatePending}
      showSubmitButton={showSubmitButton}
      isFormValid={isFormValid}
      imageUploadSlot={
        <ProductUpdateImageUpload
          initialImage={initialImage}
          onUploadComplete={setUploadedImageNames}
        />
      }
      formFieldsSlot={
        <ProductUpdateFormFields register={register} errors={errors} setValue={setValue} />
      }
    />
  );
};
