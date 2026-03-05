import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

interface ProductFormFieldsBaseProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
}

export const ProductFormFieldsBase = <T extends FieldValues>({
  register,
  errors,
  setValue,
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
          onChange={(e) => {
            // 숫자 이외 문자 전부 제거 (콤마, 글자 등)
            const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');

            // 실제 form 값은 숫자만 저장
            setValue('price' as Path<T>, onlyNumbers as never, { shouldValidate: true });

            // 화면 input에는 콤마 붙여서 표시
            e.target.value = onlyNumbers ? Number(onlyNumbers).toLocaleString() : '';
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
