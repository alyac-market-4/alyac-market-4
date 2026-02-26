import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { usePostDetailQuery, usePostMutation } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { postCreateSchema } from '@/features/post-create/model/schemas';
import PostSubmitButton from '@/features/post-create/ui/PostSubmitButton';
import { PostEditForm } from '@/features/post-edit';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

type Props = {
  post: {
    id: string;
    content?: string | null;
    image?: string | null;
  };
};

function splitImages(value?: string | null) {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function PostUpdateView({ post }: Props) {
  const uploadMutation = useUploadFiles();
  const { updateMutation } = usePostMutation();

  const [content, setContent] = useState(() => post.content ?? '');
  const [files, setFiles] = useState<File[]>([]);
  const [isTouched, setIsTouched] = useState(false);

  // ✅ 기존 이미지(서버에서 내려온 것) 상태로 관리
  const [existingImages, setExistingImages] = useState<string[]>(() => splitImages(post.image));

  const zodResult = useMemo(() => postCreateSchema.safeParse({ content, files }), [content, files]);

  const canSubmit = zodResult.success;
  const isSubmitting = uploadMutation.isPending || updateMutation.isPending;

  const onRemoveExistingImage = (index: number) => {
    setIsTouched(true);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onClickUpdate = async () => {
    if (!canSubmit || isSubmitting) return;

    const parsed = postCreateSchema.parse({ content, files });
    const safeContent = parsed.content;
    const safeFiles = parsed.files;

    let newImageSegments: string[] = [];

    // ✅ 새로 선택한 파일이 있으면 업로드 후 경로 만들기
    if (safeFiles.length > 0) {
      const uploaded = await uploadMutation.mutateAsync(safeFiles);
      newImageSegments = uploaded.map((item) => `uploadFiles/${item.filename}`);
    }

    // ✅ 기존(남은) + 새로 업로드한 것 합치기
    const merged = [...existingImages, ...newImageSegments].join(',');

    updateMutation.mutate({
      postId: post.id,
      post: {
        content: safeContent,
        image: merged,
      },
    });
  };

  return (
    <>
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canSubmit || isSubmitting} onClick={onClickUpdate} />}
      />

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
  const { postId = '' } = useParams();
  const { data: post, isLoading } = usePostDetailQuery(postId);

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

  // ✅ postId 바뀌면 내부 상태 초기화를 위해 remount
  return <PostUpdateView key={postId} post={post} />;
};

export default PostUpdatePage;
