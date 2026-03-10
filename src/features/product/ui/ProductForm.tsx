import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { productSchema } from '../model/schemas';
import { ProductFormFields } from './ProductFormFields';
import { ProductImageUpload } from './ProductImageUpload';

type ProductFormInput = z.input<typeof productSchema>;
type ProductFormOutput = z.output<typeof productSchema>;

export const PRODUCT_FORM_ID = 'product-form';

interface ProductFormProps {
  formId?: string;
  onValidChange?: (isValid: boolean) => void;
  onSubmit: (data: ProductFormOutput, uploadedImageNames: string[]) => void;
  defaultValues?: {
    productName?: string;
    price?: string;
    saleLink?: string;
  };
  initialImage?: string;
}

export const ProductForm = ({
  formId = PRODUCT_FORM_ID,
  onValidChange,
  onSubmit: onSubmitProp,
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

  // 실시간으로 입력값 감지 - 저장 버튼 활성화 조건 체크할 때 사용
  const productName = useWatch({ control, name: 'productName' });
  const price = useWatch({ control, name: 'price' });
  const saleLink = useWatch({ control, name: 'saleLink' });

  // 이미지 유효성 체크 - 업로드된 이미지가 있거나, update일 때 기존 이미지가 있으면 유효한 것으로 간주
  const currentImage = uploadedImageNames !== null ? uploadedImageNames.length > 0 : !!initialImage;

  // 저장 버튼 활성화 조건 - 모든 필드에 에러가 없어야 하고, 각 필드가 최소한의 입력 조건을 충족해야 하며, 이미지도 있어야 함
  const isFormValid =
    !errors.productName &&
    !errors.price &&
    !errors.saleLink &&
    (productName?.trim().length ?? 0) >= 2 &&
    (price?.trim().length ?? 0) > 0 &&
    (saleLink?.trim().length ?? 0) > 0 &&
    currentImage;

  // isFormValid가 바뀔 때마다 부모(페이지)로 알려줌 - 헤더 저장 버튼 활성화/비활성화
  useEffect(() => {
    onValidChange?.(isFormValid);
  }, [isFormValid, onValidChange]);

  // 폼 제출 핸들러 - 검증 통과한 경우에만 실행됨
  const onSubmit: SubmitHandler<ProductFormOutput> = (data) => {
    onSubmitProp(data, uploadedImageNames ?? []);
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 이미지 업로드 영역 - 업로드 완료되면 setUploadedImageNames 호출 */}
      <ProductImageUpload initialImage={initialImage} onUploadComplete={setUploadedImageNames} />

      {/* 상품명, 가격, 판매링크 입력 필드 */}
      <ProductFormFields register={register} errors={errors} setValue={setValue} />
    </form>
  );
};
