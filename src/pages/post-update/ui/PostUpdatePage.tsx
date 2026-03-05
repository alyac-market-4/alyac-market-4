// 게시물 수정 페이지
import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { usePostDetail, useUpdatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { PostSubmitButton, postCreateSchema } from '@/features/post-create';
import { PostEditForm } from '@/features/post-edit';
import { splitImageSegments } from '@/shared/lib';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

type Props = {
  post: {
    id: string;
    content?: string | null;
    image?: string | null;
  };
};

function PostUpdateView({ post }: Props) {
  // 이미지 업로드 API 훅
  const uploadMutation = useUploadFiles();

  // 게시글 수정 API 훅
  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost();

  // 게시글 내용 상태
  const [content, setContent] = useState(() => post.content ?? '');

  // 새로 추가할 이미지 파일
  const [files, setFiles] = useState<File[]>([]);

  // 사용자가 수정했는지 여부
  const [isTouched, setIsTouched] = useState(false);

  // 기존 이미지(서버에서 내려온 이미지) 상태
  const [existingImages, setExistingImages] = useState<string[]>(() =>
    splitImageSegments(post.image),
  );

  // Zod 스키마로 게시글 입력값 검증
  const zodResult = useMemo(() => postCreateSchema.safeParse({ content, files }), [content, files]);

  // 제출 가능 여부
  const canSubmit = zodResult.success;

  // 업로드 또는 수정 요청 중인지 확인
  const isSubmitting = uploadMutation.isPending || isUpdatePostPending;

  // 기존 이미지 삭제
  const onRemoveExistingImage = (index: number) => {
    setIsTouched(true);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 수정 버튼 클릭 시 게시글 업데이트
  const onClickUpdate = async () => {
    if (!canSubmit || isSubmitting) return;

    const parsed = postCreateSchema.parse({ content, files });
    const safeContent = parsed.content;
    const safeFiles = parsed.files;

    let newImageSegments: string[] = [];

    // 새로 선택한 이미지 업로드
    if (safeFiles.length > 0) {
      const uploaded = await uploadMutation.mutateAsync(safeFiles);
      newImageSegments = uploaded.map((item) => item.filename);
    }

    // 기존 이미지 + 새 이미지 합치기
    const merged = [...existingImages, ...newImageSegments].join(',');

    // 게시글 수정 요청
    updatePost({
      postId: post.id,
      post: {
        content: safeContent,
        image: merged,
      },
    });
  };

  return (
    <>
      {/* 상단 헤더 (뒤로가기 / 수정 버튼) */}
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canSubmit || isSubmitting} onClick={onClickUpdate} />}
      />

      {/* 게시글 수정 폼 */}
      <main className="px-4 py-6">
        <PostEditForm
          content={content}
          onChangeContent={(next) => {
            if (!isTouched) setIsTouched(true);
            setContent(next);
          }}
          files={files}
          onChangeFiles={(next) => {
            if (!isTouched) setIsTouched(true);
            setFiles(next);
          }}
          existingImages={existingImages}
          onRemoveExistingImage={onRemoveExistingImage}
        />
      </main>
    </>
  );
}

export const PostUpdatePage = () => {
  // URL에서 게시글 id 가져오기
  const { postId = '' } = useParams();

  // 게시글 상세 데이터 조회
  const { data: post, isLoading } = usePostDetail(postId);

  // 게시글 로딩 중 화면
  if (isLoading) {
    return (
      <>
        <Header left={<BackButton />} />
        <main className="px-4 py-6 text-sm opacity-60">불러오는 중...</main>
      </>
    );
  }

  // 게시글이 존재하지 않을 때
  if (!post) {
    return (
      <>
        <Header left={<BackButton />} />
        <main className="px-4 py-6 text-sm opacity-60">게시글을 찾을 수 없어요.</main>
      </>
    );
  }

  // postId 변경 시 내부 상태 초기화를 위해 컴포넌트 재마운트
  return <PostUpdateView key={postId} post={post} />;
};

export default PostUpdatePage;
