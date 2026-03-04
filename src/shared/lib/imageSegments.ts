// "a,b,c" 형태의 이미지 문자열을 안전하게 배열로 파싱하는 유틸

export const splitImageSegments = (value?: string | null): string[] => {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
};
