import { type FieldErrors, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';

import { productSchema } from '../model/schemas';

type ProductFormInput = z.input<typeof productSchema>;

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
}

export const ProductFormFields = ({ register, errors, setValue }: ProductFormFieldsProps) => {
  return (
    <div className="space-y-6">
      {/* 상품명 필드 */}
      <div>
        <label className="text-foreground text-sm font-medium">상품명</label>
        <input
          type="text"
          {...register('productName')}
          placeholder="2~15자 이내여야 합니다"
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {errors.productName && (
          <p className="text-sm text-red-500">{errors.productName.message as string}</p>
        )}
      </div>

      {/* 가격 필드 */}
      <div>
        <label className="text-foreground text-sm font-medium">가격</label>
        <input
          type="text"
          inputMode="numeric" // 모바일에서 숫자 키패드 열기
          {...register('price')}
          onChange={(e) => {
            // 1. 입력값에서 숫자 이외 문자 전부 제거 (콤마, 한글, 특수문자 등)
            const raw = e.target.value.replace(/[^0-9]/g, '');

            // 2. 콤마 추가/제거 시 커서가 튀는 걸 막기 위해 현재 커서 위치와 길이 저장
            const cursor = e.target.selectionStart ?? 0;
            const prevLength = e.target.value.length;

            // 3. react-hook-form에는 숫자만 있는 순수 값 저장 (검증, 제출 시 이 값 사용)
            setValue('price', raw as never, { shouldValidate: true });

            // 4. 화면에는 콤마 붙인 버전으로 표시 (예: 1234567 → 1,234,567)
            const formatted = raw ? Number(raw).toLocaleString() : '';
            e.target.value = formatted;

            // 5. 콤마가 추가/제거되면서 글자 수가 달라짐 → 커서 위치 보정
            const diff = formatted.length - prevLength;
            e.target.setSelectionRange(cursor + diff, cursor + diff);
          }}
          placeholder="숫자만 입력 가능합니다."
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price.message as string}</p>}
      </div>

      {/* 판매 링크 필드 */}
      <div>
        <label className="text-foreground text-sm font-medium">판매 링크</label>
        <input
          type="text"
          {...register('saleLink')}
          placeholder="URL을 입력해 주세요"
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {errors.saleLink && (
          <p className="text-sm text-red-500">{errors.saleLink.message as string}</p>
        )}
        <p className="text-muted-foreground mt-2 text-xs">
          선택 사항 (http:// 또는 https://로 시작)
        </p>
      </div>
    </div>
  );
};
