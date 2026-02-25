// src/pages/post-create/ui/PostCreatePage.tsx
import { useMemo, useState } from 'react';

import { usePostMutation } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { postCreateSchema } from '@/features/post-create/model/schemas';
import PostCreateForm from '@/features/post-create/ui/PostCreateForm';
import PostSubmitButton from '@/features/post-create/ui/PostSubmitButton';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const PostCreatePage = () => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  // 처음엔 에러 안 보여주고, 한 번이라도 건드리면 보여주기
  const [isTouched, setIsTouched] = useState(false);

  const uploadMutation = useUploadFiles();
  const { createMutation } = usePostMutation();

  const isSubmitting = uploadMutation.isPending || createMutation.isPending;

  const zodResult = useMemo(() => {
    return postCreateSchema.safeParse({ content, files });
  }, [content, files]);

  const canUpload = zodResult.success;

  const helperText = useMemo(() => {
    if (!isTouched) return ''; // 처음 진입 시엔 아무것도 안 보여줌

    // 빈 상태면 예제처럼 “내용 입력” 안내
    const isEmpty = content.trim().length === 0 && files.length === 0;
    if (isEmpty) return '게시글 내용을 입력해주세요.';

    // 그 외(이미지 4개, 용량 초과 등)도 바로 안내
    if (!zodResult.success) {
      return zodResult.error.issues[0]?.message ?? '';
    }

    return '';
  }, [isTouched, content, files.length, zodResult]);

  const onClickUpload = async () => {
    if (!canUpload || isSubmitting) return;

    const parsed = postCreateSchema.parse({ content, files });
    const safeContent = parsed.content;
    const safeFiles = parsed.files;

    try {
      let image = '';

      if (safeFiles.length > 0) {
        const uploaded = await uploadMutation.mutateAsync(safeFiles);
        image = uploaded.map((item) => item.filename).join(',');
      }

      createMutation.mutate({
        content: safeContent,
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
          onChangeContent={(next) => {
            if (!isTouched) setIsTouched(true); // ✅ 한 번이라도 입력하면 touched
            setContent(next);
          }}
          files={files}
          onChangeFiles={(next) => {
            if (!isTouched) setIsTouched(true); // ✅ 이미지 선택도 touched로 취급
            setFiles(next);
          }}
        />

        {helperText && <p className="mt-2 text-sm text-red-500">{helperText}</p>}
      </main>
    </>
  );
};

export default PostCreatePage;
