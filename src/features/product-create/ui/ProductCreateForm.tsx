import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useProductMutation } from '@/entities/product';
import { productCreateSchema } from '@/features/product-create/model/schemas';
import { Button } from '@/shared/ui/button';

import { ProductFormFields } from './ProductFormFields';
import { ProductImageUpload } from './ProductImageUpload';

type ProductFormInput = z.input<typeof productCreateSchema>;
type ProductFormOutput = z.output<typeof productCreateSchema>;

// Header의 저장 버튼이 이 폼을 submit할 수 있도록 form id를 상수로 export
export const PRODUCT_FORM_ID = 'product-form';

interface ProductCreateFormProps {
  /** true면 Header 저장 버튼 대신 폼 내부 버튼 사용 (선택) */
  showSubmitButton?: boolean;
}

export const ProductCreateForm = ({ showSubmitButton = false }: ProductCreateFormProps) => {
  const navigate = useNavigate();
  const { createMutation } = useProductMutation();
  const [uploadedImageNames, setUploadedImageNames] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput, undefined, ProductFormOutput>({
    resolver: zodResolver(productCreateSchema),
    mode: 'onChange',
    defaultValues: {
      productName: '',
      price: '',
      saleLink: '',
    },
  });

  const onSubmit: SubmitHandler<ProductFormOutput> = (data) => {
    if (!uploadedImageNames.length) {
      toast.info('이미지를 업로드 해주세요.');
      return;
    }

    const productPayload = {
      itemName: data.productName,
      price: data.price,
      itemImage: uploadedImageNames.map((name) => `uploadFiles/${name}`).join(','),
      link: data.saleLink ?? '',
    };

    createMutation.mutate(productPayload, {
      onSuccess: () => {
        toast.success('상품이 등록되었습니다.');
        navigate(-1);
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error('상품 등록에 실패했습니다.');
        }
      },
    });
  };

  return (
    <form id={PRODUCT_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 이미지 업로드 */}
      <ProductImageUpload onUploadComplete={setUploadedImageNames} />

      {/* 폼 필드 */}
      <ProductFormFields register={register} errors={errors} />

      {/* 폼 내부 버튼 (선택적 사용) */}
      {showSubmitButton && (
        <Button
          type="submit"
          disabled={createMutation.isPending}
          className="h-10 w-full cursor-pointer rounded-full bg-[#6FCA3C]/50 text-sm font-medium text-white transition-colors hover:bg-[#5CB32A]"
        >
          {createMutation.isPending ? '저장 중...' : '저장'}
        </Button>
      )}
    </form>
  );
};
