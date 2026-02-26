import { useEffect, useMemo, useState } from 'react';

import { CommentButton } from '@/entities/post';
import { ProfileBadge } from '@/entities/profile';
import { LikeButton } from '@/features/like-post';
import { imageUrl } from '@/shared/lib/imageUrl';
import type { Post } from '@/shared/model';

export const PostDetail = ({ post }: { post: Post }) => {
  const images = useMemo(
    () =>
      (post.image ?? '')
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean),
    [post.image],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const open = (idx: number) => {
    setActiveIndex(idx);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  // 키보드 조작 (ESC 닫기, ←/→ 넘기기)
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, images.length]);

  // 모달 열리면 배경 스크롤 막기
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* 작성자 */}
      <div className="flex items-center gap-3 px-4 py-4">
        <ProfileBadge
          accountname={post.author.accountname}
          image={post.author.image}
          username={post.author.username}
        />
      </div>

      {/* 본문 */}
      <div className="px-4 pb-4">
        <p className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* 이미지 썸네일/캐러셀 */}
      {images.length > 0 && (
        <div className="mb-4 px-4">
          {/* 다크모드 배경색 적용 */}
          <div className="overflow-hidden rounded-2xl border bg-white dark:bg-zinc-900">
            <div className="flex gap-2 overflow-x-auto px-3 py-3">
              {images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => open(idx)}
                  aria-label={`이미지 ${idx + 1} 크게 보기`}
                  /*  카드도 다크 배경 적용 */
                  className="min-w-[20%] shrink-0 overflow-hidden rounded-xl border bg-white p-1 dark:bg-zinc-800"
                >
                  <img
                    src={imageUrl(img)}
                    alt={`Post image ${idx + 1}`}
                    className="h-50 w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="px-4 pb-3 text-xs opacity-60">{images.length}장</div>
          </div>
        </div>
      )}

      {/* 좋아요/댓글 */}
      <div className="flex items-center gap-4 px-4">
        <LikeButton postId={post.id} heartCount={post.heartCount} hearted={post.hearted} />
        <div className="flex items-center gap-1.5">
          <CommentButton commentCount={post.commentCount} />
        </div>
      </div>

      {/* 라이트박스 모달 */}
      {isOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="이미지 크게 보기"
          onMouseDown={(e) => {
            // 바깥(오버레이) 클릭하면 닫기
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-full max-w-4xl">
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={close}
              className="absolute top-2 right-2 rounded-full bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/70"
              aria-label="닫기"
            >
              닫기
            </button>

            {/* 좌/우 버튼 (이미지가 2장 이상일 때만) */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/70"
                  aria-label="이전 이미지"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/70"
                  aria-label="다음 이미지"
                >
                  →
                </button>
              </>
            )}

            {/* 모달 카드도 다크모드 배경 적용 */}
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-zinc-900">
              <div className="flex items-center justify-center p-4">
                <img
                  src={imageUrl(images[activeIndex])}
                  alt={`Post image ${activeIndex + 1}`}
                  className="max-h-[80vh] w-full object-contain"
                />
              </div>
              <div className="px-4 pb-4 text-center text-xs opacity-70">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
