// 게시글 상세 페이지
// - 특정 게시글의 상세 내용과 댓글 목록을 보여주는 페이지
// - 게시글 조회, 댓글 조회, 댓글 작성 기능을 담당
// - 게시글 삭제/신고 메뉴 기능 포함
// - 여러 entities 훅과 widgets 컴포넌트를 조합해서 상세 화면을 구성
import { useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

// entities/comment
// - 댓글 생성 API(useCreateComment)
// - 게시글 댓글 목록 조회(usePostComments)
import { useCreateComment, usePostInfiniteComments } from '@/entities/comment';
// entities/post
// - 게시글 상세 조회(usePostDetail)
// - 게시글 삭제(useDeletePost)
// - 게시글 신고(useReportPost)
import { useDeletePost, usePostDetail, useReportPost } from '@/entities/post';
// entities/profile
// - 현재 로그인한 사용자 프로필 조회
import { useUserProfile } from '@/entities/profile';
// shared
// - 로그인 사용자 정보 확인
// - 공통 확인 다이얼로그 상태 관리
import { getTokenUserInfo, useConfirmDialogStore } from '@/shared/lib';
// shared/ui
// - 공통 UI 컴포넌트
import {
  BackButton,
  Button,
  ErrorView,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  KebabMenu,
  ProfileAvatar,
} from '@/shared/ui';
// widgets
// - 댓글 목록 UI
import { CommentList } from '@/widgets/comment-list';
import { CommentListSkeleton } from '@/widgets/comment-list';
// - 페이지 상단 헤더 UI
import { Header } from '@/widgets/header';
// - 게시글 상세 내용 UI
import { PostDetail } from '@/widgets/post-detail';

import { PostDetailPageSkeleton } from './PostDetailPageSkeleton';

export const PostDetailPage = () => {
  // URL에서 게시글 id 가져오기
  const { postId = '' } = useParams<{ postId: string }>();

  // 현재 로그인 사용자 정보 조회 (댓글 입력창 프로필 표시용)
  const { data: user } = useUserProfile(getTokenUserInfo().accountname);

  // 게시글 상세 데이터 조회
  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    refetch: refetchPost,
  } = usePostDetail(postId);

  // 댓글 생성 / 게시글 삭제 / 신고 요청 훅
  const { mutate: createComment } = useCreateComment();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: reportPost } = useReportPost();

  // 공통 확인 다이얼로그 사용
  const { openConfirm } = useConfirmDialogStore();
  const navigate = useNavigate();

  // 댓글 목록 조회
  const {
    data: commentData,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    fetchNextPage: fetchNextPageComments,
    hasNextPage: hasNextPageComments,
  } = usePostInfiniteComments(postId);
  const comments = commentData?.pages.flat() ?? [];

  // 댓글 입력 상태
  const [comment, setComment] = useState<string>('');

  // 댓글 작성 처리
  const handleCommentSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment(
      { postId, content: comment },
      {
        onSuccess: () => {
          toast.success('댓글이 등록되었습니다.');
        },
        onError: () => {
          toast.error('댓글 등록에 실패했습니다.');
        },
      },
    );
    setComment('');
  };

  // 게시글 또는 댓글 데이터 로딩 중이면 공통 로딩 UI 표시
  if (isLoadingPost || isLoadingComments) return <PostDetailPageSkeleton />;

  // 에러 발생 시 간단한 에러 화면 표시
  if (isErrorPost || isErrorComments)
    return (
      <ErrorView
        message="댓글 불러오기 실패"
        onRetry={() => {
          refetchPost();
          fetchNextPageComments();
        }}
      />
    );

  // 게시글이 존재하지 않을 경우
  if (!post) return <div>게시글을 찾을 수 없습니다</div>;

  // 현재 로그인 사용자가 게시글 작성자인지 확인
  const isMe = post.author.accountname === getTokenUserInfo().accountname;

  // 게시글 옵션 메뉴
  // - 작성자일 경우 삭제
  // - 다른 사용자 글이면 신고
  const kebabMenuItems = isMe
    ? [
        { label: '수정', onClick: () => navigate(`/post-update/${post.id}`) },
        {
          label: '삭제',
          onClick: () => {
            openConfirm({
              title: '정말 삭제하시겠습니까?',
              description: '삭제된 게시글은 복구할 수 없습니다.',
              actionText: '삭제',
              onConfirm: () => {
                deletePost(postId, {
                  onSuccess: () => {
                    toast.success('게시글이 삭제되었습니다.');
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
                reportPost(postId, {
                  onSuccess: () => {
                    toast.success('신고가 접수되었습니다.');
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
    <>
      {/* 상단 헤더
         - 뒤로가기 버튼
         - 게시글 옵션 메뉴 */}
      <Header left={<BackButton />} right={<KebabMenu items={kebabMenuItems} />} />

      <main className="flex-1 overflow-y-auto">
        {/* 게시글 상세 내용 영역
           - 실제 게시글 UI는 PostDetail 컴포넌트가 담당 */}
        <article className="border-border border-b pb-4">
          <PostDetail post={post} />
        </article>

        {/* 댓글 목록 영역 */}
        <div className="divide-border divide-y">
          {Number(post.commentCount) > 0 ? (
            <>
              <InfiniteScroll
                dataLength={comments.length}
                next={fetchNextPageComments}
                hasMore={hasNextPageComments}
                loader={<CommentListSkeleton />}
              >
                {comments?.map((comment) => (
                  <div key={comment.id} className="flex gap-3 px-4 py-4">
                    <CommentList postId={postId} comment={comment} />
                  </div>
                ))}
              </InfiniteScroll>
              {!hasNextPageComments && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground text-sm">모든 댓글을 확인했습니다.</p>
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-muted-foreground text-sm">아직 댓글이 없습니다</p>
            </div>
          )}
        </div>
      </main>

      {/* 댓글 입력 영역 (하단 고정) */}
      <div className="border-border bg-background sticky right-0 bottom-0 left-0 border-t px-4 py-3">
        <form className="flex items-center gap-3" onSubmit={handleCommentSubmit}>
          {/* 현재 사용자 프로필 */}
          <ProfileAvatar src={user?.image || ''} alt={user?.accountname || ''} size="lg" />

          {/* 댓글 입력창 + 게시 버튼 */}
          <div className="relative flex-1">
            <InputGroup variant="default" size="lg">
              <InputGroupInput
                placeholder="댓글 입력하기..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <Button variant="ghost" type="submit" className="font-semibold">
                  게시
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </form>
      </div>
    </>
  );
};
