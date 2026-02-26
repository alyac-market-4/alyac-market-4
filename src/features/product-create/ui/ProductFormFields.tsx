import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import { productCreateSchema } from '@/features/product-create/model/schemas';

// useForm의 input 타입 기준으로 props 타입 정의
type ProductFormInput = z.input<typeof productCreateSchema>;

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
}

export const ProductFormFields = ({ register, errors }: ProductFormFieldsProps) => {
  return (
    <div className="space-y-6">
      {/* 상품명 */}
      <div>
        <label className="text-foreground text-sm font-medium">상품명</label>
        <input
          type="text"
          {...register('productName')}
          placeholder="2~15자 이내여야 합니다"
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {errors.productName && <p className="text-sm text-red-500">{errors.productName.message}</p>}
      </div>

      {/* 가격 */}
      <div>
        <label className="text-foreground text-sm font-medium">가격</label>
        <input
          type="text"
          inputMode="numeric"
          {...register('price')}
          onBlur={(e) => {
            const value = e.target.value.replaceAll(',', '');
            if (!value) return;
            e.target.value = Number(value).toLocaleString();
          }}
          placeholder="숫자만 입력 가능합니다."
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
      </div>

      {/* 판매 링크 */}
      <div>
        <label className="text-foreground text-sm font-medium">판매 링크</label>
        <input
          type="text"
          {...register('saleLink')}
          placeholder="URL을 입력해 주세요"
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {errors.saleLink && <p className="text-sm text-red-500">{errors.saleLink.message}</p>}
        <p className="text-muted-foreground mt-2 text-xs">
          선택 사항 (http:// 또는 https://로 시작)
        </p>
      </div>
    </div>
  );
};
