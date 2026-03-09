import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui';

import { productSchema } from '../model/schemas';
import { ProductFormFields } from './ProductFormFields';
import { ProductImageUpload } from './ProductImageUpload';

type ProductFormInput = z.input<typeof productSchema>;
type ProductFormOutput = z.output<typeof productSchema>;

export const PRODUCT_FORM_ID = 'product-form';

interface ProductFormProps {
  formId?: string;
  showSubmitButton?: boolean;
  onValidChange?: (isValid: boolean) => void;
  onSubmit: (data: ProductFormOutput, uploadedImageNames: string[]) => void;
  isPending: boolean;
  defaultValues?: {
    productName?: string;
    price?: string;
    saleLink?: string;
  };
  initialImage?: string;
}

export const ProductForm = ({
  formId = PRODUCT_FORM_ID,
  showSubmitButton = false,
  onValidChange,
  onSubmit: onSubmitProp,
  isPending,
  defaultValues,
  initialImage,
}: ProductFormProps) => {
  const [uploadedImageNames, setUploadedImageNames] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductFormInput, undefined, ProductFormOutput>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: defaultValues ?? { productName: '', price: '', saleLink: '' },
  });

  useEffect(() => {
    if (!defaultValues) return;
    reset(defaultValues);
  }, [defaultValues, reset]);

  const productName = useWatch({ control, name: 'productName' });
  const price = useWatch({ control, name: 'price' });

  const currentImage = uploadedImageNames !== null ? uploadedImageNames.length > 0 : !!initialImage;

  const isFormValid =
    !errors.productName &&
    !errors.price &&
    !errors.saleLink &&
    (productName?.trim().length ?? 0) >= 2 &&
    (price?.trim().length ?? 0) > 0 &&
    currentImage;

  useEffect(() => {
    onValidChange?.(isFormValid);
  }, [isFormValid, onValidChange]);

  const onSubmit: SubmitHandler<ProductFormOutput> = (data) => {
    onSubmitProp(data, uploadedImageNames ?? []);
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 이미지 업로드 영역 - 업로드 완료되면 setUploadedImageNames 호출 */}
      <ProductImageUpload initialImage={initialImage} onUploadComplete={setUploadedImageNames} />

      {/* 상품명, 가격, 판매링크 입력 필드 */}
      <ProductFormFields register={register} errors={errors} setValue={setValue} />

      {/* 헤더에 버튼이 없는 경우에만 폼 하단에 버튼 표시 */}
      {showSubmitButton && (
        <Button variant="alyac" type="submit" disabled={isPending || !isFormValid}>
          {isPending ? '저장 중...' : '저장'}
        </Button>
      )}
    </form>
  );
};
