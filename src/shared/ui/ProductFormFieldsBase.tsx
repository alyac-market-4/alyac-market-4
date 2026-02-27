import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';

// create/update schema 모두 동일한 필드를 가지므로 제네릭으로 공용화
interface ProductFormFieldsBaseProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export const ProductFormFieldsBase = <T extends FieldValues>({
  register,
  errors,
}: ProductFormFieldsBaseProps<T>) => {
  return (
    <div className="space-y-6">
      {/* 상품명 */}
      <div>
        <label className="text-foreground text-sm font-medium">상품명</label>
        <input
          type="text"
          {...register('productName' as Path<T>)}
          placeholder="2~15자 이내여야 합니다"
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {errors.productName && (
          <p className="text-sm text-red-500">{errors.productName.message as string}</p>
        )}
      </div>

      {/* 가격 */}
      <div>
        <label className="text-foreground text-sm font-medium">가격</label>
        <input
          type="text"
          inputMode="numeric"
          {...register('price' as Path<T>)}
          onBlur={(e) => {
            const value = e.target.value.replaceAll(',', '');
            if (!value) return;
            e.target.value = Number(value).toLocaleString();
          }}
          placeholder="숫자만 입력 가능합니다."
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price.message as string}</p>}
      </div>

      {/* 판매 링크 */}
      <div>
        <label className="text-foreground text-sm font-medium">판매 링크</label>
        <input
          type="text"
          {...register('saleLink' as Path<T>)}
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
