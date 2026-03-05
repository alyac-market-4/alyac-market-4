// 게시물 상세 정보와 이미지 확대보기(라이트박스)를 표시하는 컴포넌트
import { useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

// 댓글 버튼 컴포넌트
import { CommentButton } from '@/entities/post';
// 작성자 프로필 표시 컴포넌트
import { ProfileBadge } from '@/entities/profile';
// 좋아요 기능 컴포넌트
import { LikeButton } from '@/features/post';
// 이미지 URL 생성 및 이미지 문자열 분리 유틸
import { imageUrl, splitImageSegments } from '@/shared/lib';
import type { Post } from '@/shared/model';

export const PostDetail = ({ post }: { post: Post }) => {
  // 게시물 이미지 문자열을 배열로 분리
  const images = useMemo(() => splitImageSegments(post.image), [post.image]);

  // 이미지 모달 열림 여부
  const [isOpen, setIsOpen] = useState(false);

  // 현재 보고 있는 이미지 index
  const [activeIndex, setActiveIndex] = useState(0);

  // 이미지 클릭 시 모달 열기
  const open = (idx: number) => {
    setActiveIndex(idx);
    setIsOpen(true);
  };

  // 모달 닫기
  const close = () => setIsOpen(false);

  // 이전 이미지로 이동
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  // 다음 이미지로 이동
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  // 모달이 열려 있을 때 키보드로 이미지 조작 (ESC, ←, →)
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

  // 모달이 열리면 배경 스크롤을 막는 처리
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
      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 px-4 py-4">
        {/* 프로필 클릭 시 해당 사용자 프로필로 이동 */}
        <Link to={`/profile/${post.author.accountname}`} className="inline-flex">
          <ProfileBadge
            accountname={post.author.accountname}
            image={post.author.image}
            username={post.author.username}
          />
        </Link>
      </div>

      {/* 게시물 내용 */}
      <div className="px-4 pb-4">
        <p className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* 게시물 이미지 썸네일 영역 */}
      {images.length > 0 && (
        <div className="mb-4 px-4">
          {/* 이미지 카드 */}
          <div className="overflow-hidden rounded-2xl border bg-white dark:bg-zinc-900">
            {/* 가로 스크롤 이미지 목록 */}
            <div className="flex gap-2 overflow-x-auto px-3 py-3">
              {images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => open(idx)}
                  aria-label={`이미지 ${idx + 1} 크게 보기`}
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

            {/* 이미지 개수 표시 */}
            <div className="px-4 pb-3 text-xs opacity-60">{images.length}장</div>
          </div>
        </div>
      )}

      {/* 좋아요 및 댓글 영역 */}
      <div className="flex items-center gap-4 px-4">
        <LikeButton postId={post.id} heartCount={post.heartCount} hearted={post.hearted} />
        <div className="flex items-center gap-1.5">
          <CommentButton commentCount={post.commentCount} />
        </div>
      </div>

      {/* 이미지 확대 보기 라이트박스 모달 */}
      {isOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="이미지 크게 보기"
          onMouseDown={(e) => {
            // 모달 바깥 클릭 시 닫기
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-full max-w-4xl">
            {/* 모달 닫기 버튼 */}
            <button
              type="button"
              onClick={close}
              className="absolute top-2 right-2 rounded-full bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/70"
              aria-label="닫기"
            >
              닫기
            </button>

            {/* 이미지 이동 버튼 (이미지 2장 이상일 때 표시) */}
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

            {/* 확대된 이미지 표시 */}
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-zinc-900">
              <div className="flex items-center justify-center p-4">
                <img
                  src={imageUrl(images[activeIndex])}
                  alt={`Post image ${activeIndex + 1}`}
                  className="max-h-[80vh] w-full object-contain"
                />
              </div>

              {/* 현재 이미지 번호 표시 */}
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
