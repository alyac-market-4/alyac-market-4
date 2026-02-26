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

function PostUpdateView({ post }: Props) {
  const uploadMutation = useUploadFiles();
  const { updateMutation } = usePostMutation();

  // ✅ post가 준비된 시점에만 렌더링되므로, 초기값을 useState 초기화 함수로 안전하게 세팅 가능
  const [content, setContent] = useState(() => post.content ?? '');
  const [files, setFiles] = useState<File[]>([]);
  const [isTouched, setIsTouched] = useState(false);

  const zodResult = useMemo(() => postCreateSchema.safeParse({ content, files }), [content, files]);

  const canSubmit = zodResult.success;
  const isSubmitting = uploadMutation.isPending || updateMutation.isPending;

  const onClickUpdate = async () => {
    if (!canSubmit || isSubmitting) return;

    const parsed = postCreateSchema.parse({ content, files });
    const safeContent = parsed.content;
    const safeFiles = parsed.files;

    let image = post.image ?? '';

    if (safeFiles.length > 0) {
      const uploaded = await uploadMutation.mutateAsync(safeFiles);
      image = uploaded.map((item) => `uploadFiles/${item.filename}`).join(',');
    }

    updateMutation.mutate({
      postId: post.id,
      post: {
        content: safeContent,
        image,
      },
    });
  };

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <PostSubmitButton
            disabled={!canSubmit || isSubmitting || !isTouched}
            onClick={onClickUpdate}
          />
        }
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
