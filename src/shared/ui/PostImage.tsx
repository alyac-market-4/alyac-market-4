import { imageUrl } from '@/shared/lib';

type Props = {
  src?: string | null;
  alt?: string;
  /**
   * 예제처럼 보이도록 최대 너비/높이를 제한합니다.
   * (원하면 사용처에서 className을 따로 두고 확장해도 됨)
   */
  maxWidthClassName?: string;
  maxHeightClassName?: string;
};

/**
 * 게시물 이미지 표시용 컴포넌트
 * - object-contain으로 이미지가 잘리지 않게 표시
 * - 중앙 정렬 + 패딩으로 예제처럼 여백이 생기도록
 */
export function PostImage({
  src,
  alt = 'Post image',
  maxWidthClassName = 'max-w-[720px]',
  maxHeightClassName = 'max-h-[480px]',
}: Props) {
  const url = imageUrl(src);

  if (!url) return null;

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border bg-white">
      <div className="flex w-full items-center justify-center p-6">
        <img
          src={url}
          alt={alt}
          loading="lazy"
          className={`${maxHeightClassName} w-full ${maxWidthClassName} object-contain`}
        />
      </div>
    </div>
  );
}
