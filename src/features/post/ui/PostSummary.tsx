// 게시글 요약 카드 컴포넌트
// - 피드 화면에서 게시글 하나를 카드 형태로 보여주는 UI
// - 작성자 정보, 게시글 내용, 이미지, 좋아요/댓글 기능을 표시
// - 수정/삭제/신고 메뉴를 통해 게시글 관리 기능 제공
// - 여러 공통 컴포넌트와 entities 훅을 조합해서 게시글 UI를 구성
import { Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// entities/post
// - 댓글 버튼 UI
// - 게시글 삭제 요청(useDeletePost)
// - 게시글 신고 요청(useReportPost)
import { CommentButton, useDeletePost, useReportPost } from '@/entities/post';
// entities/profile
// - 작성자 프로필 정보를 표시하는 컴포넌트
import { ProfileBadge } from '@/entities/profile';
// shared
// - 로그인 사용자 정보 확인
// - 이미지 문자열을 배열로 분리
// - 공통 확인 다이얼로그 상태 관리
import { getTokenUserInfo, splitImageSegments, useConfirmDialogStore } from '@/shared/lib';
import type { Post } from '@/shared/model';
// shared/ui
// - 케밥 메뉴(게시글 옵션 메뉴)
// - 게시글 이미지 표시 컴포넌트
import { KebabMenu, PostImage } from '@/shared/ui';

// features/post
// - 좋아요 기능 UI 및 로직
import { LikeButton } from './LikeButton';

interface PostSummaryProps {
  post: Post;
  to: string;
  isFetchingNextPage?: boolean;
}

export const PostSummary = ({ post, to, isFetchingNextPage }: PostSummaryProps) => {
  // 게시글 상세 페이지 이동을 위한 라우터 훅
  const navigate = useNavigate();

  // 게시글 삭제 / 신고 요청 훅
  const { mutate: deletePost, isPending: isDeletePending } = useDeletePost();
  const { mutate: reportPost, isPending: isReportPending } = useReportPost();

  // 공통 확인 다이얼로그(store) 사용
  const { openConfirm } = useConfirmDialogStore();

  // 게시글 클릭 시 상세 페이지 이동
  const goDetail = () => navigate(to);

  // 게시글 이미지 개수 계산
  const imageCount = splitImageSegments(post.image).length;

  // 현재 로그인 사용자와 게시글 작성자가 같은지 확인
  const isMe = post.author.accountname === getTokenUserInfo().accountname;

  // 게시글 옵션 메뉴 설정
  // - 내가 작성한 글이면 수정/삭제
  // - 다른 사람 글이면 신고하기
  const kebabMenuItems = isMe
    ? [
        { label: '수정', onClick: () => navigate(`/post-update/${post.id}`) },
        {
          label: '삭제',
          onClick: () => {
            openConfirm({
              title: '정말 삭제하시겠습니까?',
              description: '삭제된 게시물은 복구할 수 없습니다.',
              actionText: '삭제',
              onConfirm: () => {
                deletePost(post.id, {
                  onSuccess: () => {
                    toast.info('게시글을 삭제했습니다.');
                  },
                  onError: () => {
                    toast.error('게시글 삭제에 실패했습니다.');
                  },
                });
              },
            });
          },
        },
      ]
    : [
        {
          label: '신고하기',
          onClick: () => {
            openConfirm({
              title: '정말 신고하시겠습니까?',
              description: '신고는 취소할 수 없습니다.',
              actionText: '신고',
              onConfirm: () => {
                reportPost(post.id, {
                  onSuccess: () => {
                    toast.info('신고가 접수되었습니다.');
                  },
                  onError: () => {
                    toast.error('신고 처리에 실패했습니다.');
                  },
                });
              },
            });
          },
        },
      ];

  return (
    <article
      key={post.id}
      className="border-border cursor-pointer border-b py-4"
      onClick={goDetail}
    >
      {/* 작성자 프로필 영역
         - ProfileBadge 컴포넌트를 사용해 작성자 정보 표시
         - 클릭 시 작성자 프로필 페이지로 이동
         - 이벤트 전파 방지로 게시글 상세 이동 방지 */}
      <div className="mb-3 flex items-center justify-between">
        <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <Link to={`/profile/${post.author.accountname}`} className="inline-flex">
            <ProfileBadge
              username={post.author.username}
              accountname={post.author.accountname}
              image={post.author.image}
            />
          </Link>
        </div>

        {/* 게시글 옵션 메뉴
           - 수정 / 삭제 / 신고 기능 제공 */}
        <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <KebabMenu
            items={kebabMenuItems}
            disabled={isFetchingNextPage || isDeletePending || isReportPending}
          />
        </div>
      </div>

      {/* 게시글 본문 내용 */}
      <p className="text-foreground mb-3 ml-12 text-sm leading-relaxed">{post.content}</p>

      {/* 게시글 이미지 영역
         - PostImage 컴포넌트로 이미지 표시
         - 이미지가 여러 장이면 우측 상단에 개수 배지 표시 */}
      {imageCount > 0 && (
        <div className="ml-12">
          <div className="relative">
            <PostImage src={post.image} alt="Post image" />

            {imageCount > 1 && (
              <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                <Layers className="h-6 w-6" />
                {imageCount}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 게시글 상호작용 영역
         - 좋아요 기능
         - 댓글 개수 표시 및 댓글 페이지 이동 */}
      <div className="mt-3 ml-12 flex gap-4">
        <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <LikeButton
            postId={post.id}
            heartCount={post.heartCount}
            hearted={post.hearted}
            disabled={isFetchingNextPage}
          />
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(to);
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <CommentButton commentCount={post.commentCount} />
        </div>
      </div>
    </article>
  );
};
