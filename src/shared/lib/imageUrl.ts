// shared/lib/imageUrl.ts

/**
 * 서버/스토리지에서 내려오는 이미지 경로를 "브라우저에서 바로 열 수 있는" URL로 변환합니다.
 *
 * - API가 filename(예: "1700000000000.jpg")만 주는 경우 -> `${VITE_IMAGE_BASE_URL}/${filename}`
 * - 이미 절대경로(URL)인 경우 -> 그대로 반환
 * - 여러 장(콤마로 연결)인 경우 -> split 후 각각 변환
 */

// const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value) || value.startsWith('data:');
const isAbsoluteUrl = (value: string) =>
  /^https?:\/\//i.test(value) || value.startsWith('data:') || value.startsWith('blob:');

const joinUrl = (base: string, path: string) => {
  const normalizedBase = (base ?? '').replace(/\/+$/, '');
  const normalizedPath = (path ?? '').replace(/^\/+/, '');
  return `${normalizedBase}/${normalizedPath}`;
};

export const imageUrls = (value?: string | null): string[] => {
  if (!value) return [];

  const baseUrl: string = import.meta.env.VITE_IMAGE_BASE_URL;

  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
    .map((v) => {
      if (isAbsoluteUrl(v)) return v;

      // 서버에서 단순 filename만 내려오는 경우가 있어, 기본 업로드 폴더를 보정합니다.
      // 예) "1700000000000.jpg" -> "uploadFiles/1700000000000.jpg"
      const normalized = v.includes('/') ? v : `uploadFiles/${v}`;
      return joinUrl(baseUrl, normalized);
    });
};

export const imageUrl = (value?: string | null, fallback: string = ''): string => {
  const urls = imageUrls(value);
  return urls[0] ?? fallback;
};
