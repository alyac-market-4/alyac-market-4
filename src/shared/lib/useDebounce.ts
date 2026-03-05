// 입력값이 변경된 뒤 delay(ms) 동안 추가 변경이 없을 때 최종 값을 반환하는 디바운스 훅
// React 상태와 효과 훅 import
import { useEffect, useState } from 'react';

// 입력값을 delay 후에 반영
export function useDebounce<T>(value: T, delay: number) {
  // 지연 적용될 값을 저장하는 상태
  const [debouncedValue, setDebouncedValue] = useState(value);

  // value 또는 delay가 변경될 때 실행
  useEffect(() => {
    // delay(ms) 후 실행되는 타이머 생성
    const timer = setTimeout(() => {
      // delay 후 최신 값으로 업데이트
      setDebouncedValue(value);
    }, delay);

    // 값이 다시 변경되면 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [value, delay]);

  // 지연된 최종 값 반환
  return debouncedValue;
}
