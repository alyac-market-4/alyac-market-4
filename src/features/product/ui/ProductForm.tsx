import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { ProductFormBase } from '@/shared/ui';

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

  // update일 때 API에서 데이터 늦게 오면 reset으로 폼 채워줌
  useEffect(() => {
    if (!defaultValues) return;
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedDefaultValues]); // ← reset, defaultValues 제거. stringify로만 감지

  const productName = useWatch({ control, name: 'productName' });
  const price = useWatch({ control, name: 'price' });

  // 이미지: 새로 업로드했으면 그걸로, 아니면 기존 이미지 있는지 확인
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
    <ProductFormBase
      formId={formId}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isPending={isPending}
      showSubmitButton={showSubmitButton}
      isFormValid={isFormValid}
      imageUploadSlot={
        <ProductImageUpload initialImage={initialImage} onUploadComplete={setUploadedImageNames} />
      }
      formFieldsSlot={<ProductFormFields register={register} errors={errors} setValue={setValue} />}
    />
  );
};
