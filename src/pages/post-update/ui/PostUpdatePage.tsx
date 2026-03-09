// 게시물 수정 페이지
// - pages에서는 "게시물 수정 화면" 자체를 담당
// - 실제 입력 폼 UI는 features/post의 PostForm을 가져와서 재사용
// - 게시글 수정 API는 entities/post, 이미지 업로드 API는 entities/upload 훅을 사용
// - content/files 검증은 postCreateSchema에 맡기고,
//   수정 페이지는 "기존 이미지가 남아 있는 경우"만 추가로 허용
import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { usePostDetail, useUpdatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { PostSubmitButton, postCreateSchema } from '@/features/post';
import { splitImageSegments } from '@/shared/lib';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { PostForm } from '@/widgets/post-form';

type Props = {
  post: {
    id: string;
    content?: string | null;
    image?: string | null;
  };
};

function PostUpdateView({ post }: Props) {
  // API 훅
  // - uploadMutation: 새 이미지 업로드 요청
  // - updatePost: 게시글 수정 요청
  const uploadMutation = useUploadFiles();
  const { mutateAsync: updatePostAsync, isPending: isUpdatePostPending } = useUpdatePost();

  // 페이지 내부 상태
  // - content: 수정 중인 게시글 내용
  // - files: 새로 추가한 이미지 파일 목록
  // - existingImages: 서버에 이미 저장된 기존 이미지 목록
  // - isTouched: 사용자가 한 번이라도 수정/선택했는지 여부
  const [content, setContent] = useState(() => post.content ?? '');
  const [files, setFiles] = useState<File[]>([]);
  const [isTouched, setIsTouched] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>(() =>
    splitImageSegments(post.image),
  );

  // 업로드 중이거나 수정 요청 중이면 제출 중 상태로 처리
  const isSubmitting = uploadMutation.isPending || isUpdatePostPending;

  // content/files 입력값 검증은 공통 스키마 사용
  const zodResult = useMemo(() => {
    return postCreateSchema.safeParse({ content, files });
  }, [content, files]);

  // 수정 페이지에서는
  // - 공통 스키마를 통과했거나
  // - 기존 이미지가 하나라도 남아 있으면
  // 제출 가능하게 처리
  const canSubmit = zodResult.success || existingImages.length > 0;

  // 수정 페이지 안내문 계산
  // - 처음엔 숨김
  // - 기존 이미지가 남아 있으면 스키마 실패여도 안내문을 띄우지 않음
  //   (수정 페이지에서는 기존 이미지 자체가 유효한 입력으로 취급되기 때문)
  // - 그 외에는 스키마 에러 메시지만 표시
  const helperText = useMemo(() => {
    if (!isTouched) return '';
    if (existingImages.length > 0) return '';
    if (!zodResult.success) return zodResult.error.issues[0]?.message ?? '';
    return '';
  }, [isTouched, existingImages.length, zodResult]);

  // 기존 이미지 삭제 처리
  const onRemoveExistingImage = (index: number) => {
    setIsTouched(true);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 수정 버튼 클릭 시 최종 처리
  // 1) 새 이미지가 있으면 먼저 업로드
  // 2) 기존 이미지 + 새 이미지 경로를 합침
  // 3) 게시글 수정 API 호출
  const onClickUpdate = async () => {
    if (!isTouched) setIsTouched(true);

    if (!canSubmit || isSubmitting) return;

    // 수정 페이지에서는 기존 이미지가 남아 있는 경우도 허용하므로
    // parse() 대신 필요한 값만 직접 정리해서 사용
    const safeContent = content.trim();
    const safeFiles = files;

    let newImageSegments: string[] = [];

    if (safeFiles.length > 0) {
      const uploaded = await uploadMutation.mutateAsync(safeFiles);
      newImageSegments = uploaded.map((item) => item.filename);
    }

    const merged = [...existingImages, ...newImageSegments].join(',');

    await updatePostAsync({
      postId: post.id,
      post: {
        content: safeContent,
        image: merged,
      },
    });

    // 수정 성공 토스트
    toast.success('게시글이 수정되었습니다.');
  };

  return (
    <>
      {/* 공통 헤더 UI 재사용 */}
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canSubmit || isSubmitting} onClick={onClickUpdate} />}
      />

      {/* 공통 폼 UI 재사용
          - 수정 페이지에서는 기존 이미지 표시/삭제 기능까지 함께 사용 */}
      <main className="px-4 py-6">
        <PostForm
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

        {/* 수정 페이지 검증 안내문 표시 */}
        {helperText && <p className="mt-2 text-sm text-red-500">{helperText}</p>}
      </main>
    </>
  );
}

export const PostUpdatePage = () => {
  // URL에서 수정할 게시글 id 추출
  const { postId = '' } = useParams();

  // 게시글 상세 조회
  const { data: post, isLoading } = usePostDetail(postId);

  if (isLoading) {
    return (
      <>
        <Header left={<BackButton />} />
        <main className="px-4 py-6 text-sm opacity-60">불러오는 중...</main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header left={<BackButton />} />
        <main className="px-4 py-6 text-sm opacity-60">게시글을 찾을 수 없어요.</main>
      </>
    );
  }

  return <PostUpdateView key={postId} post={post} />;
};

export default PostUpdatePage;
