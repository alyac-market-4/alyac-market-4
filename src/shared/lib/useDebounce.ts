// 입력값이 변경된 뒤 delay(ms) 동안 추가 변경이 없을 때 최종 값을 반환하는 디바운스 훅
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
