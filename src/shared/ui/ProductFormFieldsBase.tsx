import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

// 이 컴포넌트가 받을 props의 타입 정의
// <T extends FieldValues> : "T는 폼 데이터 객체여야 한다"는 조건
// 예) T = { productName: string, price: string, saleLink: string }
interface ProductFormFieldsBaseProps<T extends FieldValues> {
  register: UseFormRegister<T>; // input을 react-hook-form에 연결해주는 함수
  errors: FieldErrors<T>; // 유효성 검사 실패 시 에러 메시지 담긴 객체
  setValue: UseFormSetValue<T>; // 특정 필드 값을 코드로 직접 바꿀 때 쓰는 함수
}

// <T extends FieldValues> : 제네릭. 어떤 폼 타입이든 재사용 가능하게 해줌
export const ProductFormFieldsBase = <T extends FieldValues>({
  register,
  errors,
  setValue,
}: ProductFormFieldsBaseProps<T>) => {
  return (
    <div className="space-y-6">
      {' '}
      {/* 자식 요소들 사이에 세로 간격 24px */}
      {/* 상품명 필드 */}
      <div>
        <label className="text-foreground text-sm font-medium">상품명</label>
        <input
          type="text"
          // register('productName') : 이 input을 react-hook-form에 등록
          // 'productName' as Path<T> : T 타입 안에 있는 키 이름임을 TypeScript에게 알려줌
          // → 이걸 해야 유효성 검사, 값 수집이 자동으로 됨
          {...register('productName' as Path<T>)}
          placeholder="2~15자 이내여야 합니다"
          className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
        />
        {/* errors.productName 이 존재할 때만 에러 문구 표시 */}
        {errors.productName && (
          <p className="text-sm text-red-500">{errors.productName.message as string}</p>
        )}
      </div>
      {/* 가격 필드 */}
      <div>
        <label className="text-foreground text-sm font-medium">가격</label>
        <input
          type="text"
          inputMode="numeric" // 모바일에서 숫자 키패드가 뜨게 함 (type="number"와 다름)
          {...register('price' as Path<T>)}
          onChange={(e) => {
            // 사용자가 입력한 값에서 숫자 이외 문자(콤마, 한글 등) 전부 제거
            // 예) "1,234원" → "1234"
            const raw = e.target.value.replace(/[^0-9]/g, '');

            // 현재 커서 위치 저장 (콤마 때문에 커서가 튀는 걸 방지하기 위해)
            // selectionStart : 커서가 몇 번째 글자 앞에 있는지
            // ?? 0 : null이면 0으로 대체 (nullish coalescing 연산자)
            const cursor = e.target.selectionStart ?? 0;

            // 콤마 보정 계산용으로, 포맷 전 길이를 미리 저장
            const prevLength = e.target.value.length;

            // react-hook-form에는 숫자만 있는 값(raw)을 저장
            // shouldValidate: true → 값 바꾸면 즉시 유효성 검사 실행
            // as never : TypeScript가 타입 오류를 내지 않도록 강제 캐스팅 (임시방편)
            setValue('price' as Path<T>, raw as never, { shouldValidate: true });

            // 화면에 보이는 값은 콤마 붙인 버전으로 표시
            // 예) "1234" → "1,234"
            // raw가 빈 문자열이면 그냥 '' 표시
            const formatted = raw ? Number(raw).toLocaleString() : '';
            e.target.value = formatted;

            // 콤마가 추가/제거되면 글자 수가 달라져서 커서가 튀는 문제 보정
            // diff = 포맷 후 길이 - 포맷 전 길이
            // 예) "1234" → "1,234" : diff = 5 - 4 = +1 → 커서 1칸 앞으로
            // 예) "1,234" → "134" : diff = 3 - 5 = -2 → 커서 2칸 뒤로
            const diff = formatted.length - prevLength;

            // 보정된 위치로 커서 이동
            // setSelectionRange(start, end) : start~end 범위 선택. 같으면 그냥 커서만 이동
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
