import { useMemo, useState } from 'react';

import { usePostMutation } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import PostCreateForm from '@/features/post-create/ui/PostCreateForm';
import PostSubmitButton from '@/features/post-create/ui/PostSubmitButton';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const PostCreatePage = () => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const uploadMutation = useUploadFiles();
  const { createMutation } = usePostMutation();

  const canUpload = useMemo(() => {
    return content.trim().length > 0 || files.length > 0;
  }, [content, files.length]);

  const isSubmitting = uploadMutation.isPending || createMutation.isPending;

  const onClickUpload = async () => {
    if (!canUpload || isSubmitting) return;

    try {
      // 1) 이미지 업로드(선택한 경우만)
      let image = '';
      if (files.length > 0) {
        const uploaded = await uploadMutation.mutateAsync(files);
        image = uploaded.map((item) => item.filename).join(',');
      }

      // 2) 게시글 생성
      createMutation.mutate({
        content,
        image,
      });
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      else alert('업로드/등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canUpload || isSubmitting} onClick={onClickUpload} />}
      />

      <main className="px-4 py-6">
        <PostCreateForm
          content={content}
          onChangeContent={setContent}
          files={files}
          onChangeFiles={setFiles}
        />
      </main>
    </>
  );
};
