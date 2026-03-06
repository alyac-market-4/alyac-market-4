// 게시물 수정 페이지
// - pages에서는 "수정 화면" 자체를 담당
// - 실제 입력 폼 UI는 features/post의 PostForm을 가져와서 재사용
// - 게시글 조회/수정 API는 entities/post의 훅을 사용
// - 이 파일은 여러 레이어의 공통 기능을 조합해서 "수정 페이지"를 만드는 역할
import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

// entities/post
// - 수정할 게시글 상세 조회(usePostDetail)
// - 게시글 수정 요청(useUpdatePost)
import { usePostDetail, useUpdatePost } from '@/entities/post';
// entities/upload
// - 새로 추가한 이미지 업로드 요청
import { useUploadFiles } from '@/entities/upload';
// features/post
// - 작성/수정 공통 폼 UI(PostForm)
// - 작성/수정 공통 제출 버튼(PostSubmitButton)
// - 작성 페이지와 수정 페이지가 같은 폼/버튼을 재사용하도록 분리해둔 부분
import { PostForm, PostSubmitButton, postCreateSchema } from '@/features/post';
// shared
// - 기존 이미지 문자열을 배열로 분리하는 공통 유틸
import { splitImageSegments } from '@/shared/lib';
// shared/ui, widgets
// - 페이지 공통 뒤로가기 버튼 / 헤더
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
  // 페이지 내부 상태
  // - content: 수정할 게시글 내용
  // - files: 새로 추가한 이미지 파일
  // - existingImages: 기존에 서버에 저장되어 있던 이미지
  // - isTouched: 사용자가 수정/선택을 시작했는지 여부
  const uploadMutation = useUploadFiles();
  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost();

  const [content, setContent] = useState(() => post.content ?? '');
  const [files, setFiles] = useState<File[]>([]);
  const [isTouched, setIsTouched] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>(() =>
    splitImageSegments(post.image),
  );

  // 제출 가능 여부 / 안내문 / 요청 중 상태 계산
  // - 작성 페이지와 비슷한 검증 흐름을 수정 페이지에도 맞춰서 적용
  // - 수정 페이지는 "기존 이미지가 남아 있는 경우"도 제출 가능해야 한다는 점만 다름
  const isSubmitting = uploadMutation.isPending || isUpdatePostPending;

  const trimmedContent = useMemo(() => content.trim(), [content]);

  const zodResult = useMemo(() => {
    return postCreateSchema.safeParse({ content, files });
  }, [content, files]);

  const canSubmit = zodResult.success || existingImages.length > 0;

  const helperText = useMemo(() => {
    if (!isTouched) return '';

    const isEmpty =
      trimmedContent.length === 0 && files.length === 0 && existingImages.length === 0;

    if (isEmpty) return '게시글 내용을 입력해주세요.';

    if (!zodResult.success && existingImages.length === 0) {
      return zodResult.error.issues[0]?.message ?? '';
    }

    return '';
  }, [isTouched, trimmedContent, files.length, existingImages.length, zodResult]);

  // 기존 이미지 삭제 처리
  // - 실제 삭제 UI는 PostForm 안에 있고
  // - 삭제되었을 때 어떤 state를 바꿀지는 이 페이지가 담당
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

    const safeContent = trimmedContent;
    const safeFiles = files;

    let newImageSegments: string[] = [];

    if (safeFiles.length > 0) {
      const uploaded = await uploadMutation.mutateAsync(safeFiles);
      newImageSegments = uploaded.map((item) => item.filename);
    }

    const merged = [...existingImages, ...newImageSegments].join(',');

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
      {/* 공통 헤더 UI 재사용 */}
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canSubmit || isSubmitting} onClick={onClickUpdate} />}
      />

      {/* 공통 폼 UI 재사용
          - PostForm은 작성 페이지와 수정 페이지가 같이 쓰는 입력 폼
          - 수정 페이지에서는 existingImages / onRemoveExistingImage를 추가로 넘겨서
            "기존 이미지 표시/삭제" 기능까지 함께 사용 */}
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

        {/* 작성 페이지와 동일한 방식의 검증 안내문 표시 */}
        {helperText && <p className="mt-2 text-sm text-red-500">{helperText}</p>}
      </main>
    </>
  );
}

export const PostUpdatePage = () => {
  // 라우터에서 postId를 받아서
  // entities/post의 상세 조회 훅으로 수정할 게시글 데이터를 가져옴
  const { postId = '' } = useParams();
  const { data: post, isLoading } = usePostDetail(postId);

  // 로딩/에러/정상 상태를 분기해서 페이지 렌더링
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

  // 실제 수정 UI는 PostUpdateView에서 담당
  return <PostUpdateView key={postId} post={post} />;
};

export default PostUpdatePage;
