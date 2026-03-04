import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useProductMutation } from '@/entities/product';
import { productCreateSchema } from '@/features/product-create/model/schemas';
import { ProductFormBase } from '@/shared/ui/ProductFormBase';

import { ProductFormFields } from './ProductFormFields';
import { ProductImageUpload } from './ProductImageUpload';

type ProductFormInput = z.input<typeof productCreateSchema>;
type ProductFormOutput = z.output<typeof productCreateSchema>;

export const PRODUCT_FORM_ID = 'product-form';

interface ProductCreateFormProps {
  showSubmitButton?: boolean;
  onValidChange?: (isValid: boolean) => void;
}

export const ProductCreateForm = ({
  showSubmitButton = false,
  onValidChange,
}: ProductCreateFormProps) => {
  const navigate = useNavigate();
  const { createMutation } = useProductMutation();
  const [uploadedImageNames, setUploadedImageNames] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductFormInput, undefined, ProductFormOutput>({
    resolver: zodResolver(productCreateSchema),
    mode: 'onChange',
    defaultValues: { productName: '', price: '', saleLink: '' },
  });

  const productName = useWatch({ control, name: 'productName' });
  const price = useWatch({ control, name: 'price' });

  // 버튼 활성화 조건: 상품명 + 가격 + 이미지 모두 있어야 활성화
  const isFormValid =
    !errors.productName &&
    !errors.price &&
    !errors.saleLink &&
    (productName?.trim().length ?? 0) >= 2 &&
    (price?.trim().length ?? 0) > 0 &&
    uploadedImageNames.length > 0;

  // 부모(ProductCreatePage)에 활성화 상태 전달
  useEffect(() => {
    onValidChange?.(isFormValid);
  }, [isFormValid, onValidChange]);

  const onSubmit: SubmitHandler<ProductFormOutput> = (data) => {
    if (!uploadedImageNames.length) {
      toast.info('이미지를 업로드 해주세요.');
      return;
    }

    createMutation.mutate(
      {
        itemName: data.productName,
        price: data.price,
        itemImage: uploadedImageNames.join(','),
        link: data.saleLink ?? '',
      },
      {
        onSuccess: () => {
          toast.success('상품이 등록되었습니다.');
          navigate(-1);
        },
        onError: () => {
          toast.error('상품 등록에 실패했습니다.');
        },
      },
    );
  };

  return (
    <ProductFormBase
      formId={PRODUCT_FORM_ID}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isPending={createMutation.isPending}
      showSubmitButton={showSubmitButton}
      isFormValid={isFormValid}
      imageUploadSlot={<ProductImageUpload onUploadComplete={setUploadedImageNames} />}
      formFieldsSlot={<ProductFormFields register={register} errors={errors} setValue={setValue} />}
    />
  );
};
