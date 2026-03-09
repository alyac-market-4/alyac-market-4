import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';

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

  const stringifiedDefaultValues = JSON.stringify(defaultValues);

  // update일 때 API 데이터가 늦게 오면 reset으로 폼 채워줌
  useEffect(() => {
    if (!defaultValues) return;
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedDefaultValues]);

  const productName = useWatch({ control, name: 'productName' });
  const price = useWatch({ control, name: 'price' });

  // 새로 업로드한 이미지가 있으면 그걸로, 없으면 기존 이미지 있는지 확인
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
    // 실제 API 호출은 페이지에서, 여기선 데이터만 올려줌
    onSubmitProp(data, uploadedImageNames ?? []);
  };

  // ↓ ProductFormBase 내용을 직접 여기에 씀 (Base 파일 필요 없어짐)
  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 이미지 업로드 영역 */}
      <ProductImageUpload initialImage={initialImage} onUploadComplete={setUploadedImageNames} />

      {/* 폼 필드 영역 */}
      <ProductFormFields register={register} errors={errors} setValue={setValue} />

      {/* showSubmitButton이 true일 때만 버튼 표시 (현재 페이지에서 헤더 버튼 쓰므로 false) */}
      {showSubmitButton && (
        <Button variant="alyac" type="submit" disabled={isPending || !isFormValid}>
          {isPending ? '저장 중...' : '저장'}
        </Button>
      )}
    </form>
  );
};
