// 게시물 이미지 표시용 컴포넌트
// 서버에 저장된 이미지 경로를 imageUrl 유틸을 통해 실제 URL로 변환하여 화면에 출력
import { imageUrl } from '@/shared/lib';

type Props = {
  src?: string | null; // 서버에서 전달받은 이미지 경로
  alt?: string; // 이미지 대체 텍스트 (기본값: 'Post image')
};

export function PostImage({ src, alt = 'Post image' }: Props) {
  // 이미지 경로를 실제 접근 가능한 URL로 변환
  const url = imageUrl(src);

  // 이미지 URL이 없는 경우 컴포넌트를 렌더링하지 않음
  if (!url) return null;

  return (
    // 이미지 영역 카드 스타일 컨테이너
    <div className="border-border bg-card mt-3 overflow-hidden rounded-2xl border">
      {/* 이미지 중앙 정렬을 위한 래퍼 */}
      <div className="flex w-full items-center justify-center p-6">
        <img
          src={url} // 변환된 이미지 URL
          alt={alt} // 접근성을 위한 대체 텍스트
          className="max-h-[480px] w-full max-w-[720px] object-contain" // 비율 유지하며 최대 크기 제한
          loading="lazy" // 화면에 보일 때 로드하여 성능 최적화
        />
      </div>
    </div>
  );
}
