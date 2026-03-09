import { useEffect, useMemo, useState } from 'react';

// useMemo 추가 - defaultValues 직렬화 최적화용

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';

import { productSchema } from '../model/schemas';
import { ProductFormFields } from './ProductFormFields';
import { ProductImageUpload } from './ProductImageUpload';

// z.input  - 폼에서 입력받는 원본 타입 (price가 string)
// z.output - zod transform 통과 후 타입 (price가 number)
type ProductFormInput = z.input<typeof productSchema>;
type ProductFormOutput = z.output<typeof productSchema>;

// 헤더 버튼에서 form="product-form"으로 연결할 때 쓰는 ID
export const PRODUCT_FORM_ID = 'product-form';

interface ProductFormProps {
  formId?: string;
  showSubmitButton?: boolean; // 폼 하단에 버튼 직접 보여줄지 여부 (기본값 false - 헤더 버튼 사용)
  onValidChange?: (isValid: boolean) => void; // 폼 유효성 바뀔 때마다 부모(페이지)로 알려줌
  onSubmit: (data: ProductFormOutput, uploadedImageNames: string[]) => void; // 제출 시 부모로 데이터 올려줌
  isPending: boolean; // API 호출 중 여부 (중복 제출 방지)
  defaultValues?: {
    productName?: string;
    price?: string;
    saleLink?: string;
  };
  initialImage?: string; // update일 때만 넘겨줌 (기존 이미지 경로)
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
  // 업로드된 이미지 파일명 배열 상태
  // null   - 아직 아무것도 업로드 안 함 (create 초기 / update 초기)
  // []     - 업로드 시도했는데 파일명이 없는 경우 (거의 없음)
  // ['파일명'] - 정상 업로드 완료
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
    mode: 'onChange', // 입력할 때마다 실시간 검증
    defaultValues: defaultValues ?? { productName: '', price: '', saleLink: '' },
  });

  // defaultValues를 문자열로 직렬화해서 메모이제이션
  // 렌더링마다 JSON.stringify가 실행되지 않도록 useMemo로 감쌈
  const stringifiedDefaultValues = useMemo(
    () => JSON.stringify(defaultValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultValues],
  );

  // update일 때 API 데이터가 늦게 오면 (isLoading 끝난 후) reset으로 폼 채워줌
  // create일 때는 defaultValues가 없으므로 실행 안 됨
  useEffect(() => {
    if (!defaultValues) return;
    reset(defaultValues);
    // stringifiedDefaultValues가 바뀔 때만 실행 (defaultValues 객체 참조가 매번 바뀌어도 내용이 같으면 reset 안 함)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedDefaultValues]);

  // 실시간으로 입력값 감지 - 저장 버튼 활성화 조건 체크용
  const productName = useWatch({ control, name: 'productName' });
  const price = useWatch({ control, name: 'price' });

  // 이미지 유효성 체크
  // uploadedImageNames가 null이 아니면 새로 업로드한 게 있는지 확인
  // null이면 (아직 업로드 안 함) 기존 이미지(initialImage)가 있는지 확인
  const currentImage = uploadedImageNames !== null ? uploadedImageNames.length > 0 : !!initialImage;

  // 저장 버튼 활성화 조건
  // 에러 없음 + 상품명 2자 이상 + 가격 입력 + 이미지 있음
  const isFormValid =
    !errors.productName &&
    !errors.price &&
    !errors.saleLink &&
    (productName?.trim().length ?? 0) >= 2 &&
    (price?.trim().length ?? 0) > 0 &&
    currentImage;

  // isFormValid가 바뀔 때마다 부모(페이지)로 알려줌 - 헤더 저장 버튼 활성화/비활성화
  useEffect(() => {
    onValidChange?.(isFormValid);
  }, [isFormValid, onValidChange]);

  // 폼 제출 핸들러
  // zod transform 통과 후 ProductFormOutput 타입으로 data가 옴 (price가 number)
  const onSubmit: SubmitHandler<ProductFormOutput> = (data) => {
    // 실제 API 호출은 부모 페이지에서 담당, 여기선 데이터만 올려줌
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
