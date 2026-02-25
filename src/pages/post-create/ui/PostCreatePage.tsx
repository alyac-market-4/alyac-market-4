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

  const uploadMutation = useUploadFiles();
  const { createMutation } = usePostMutation();

  const isSubmitting = uploadMutation.isPending || createMutation.isPending;

  // ✅ 현재 입력 상태를 항상 검증해서 버튼 상태/안내문을 통일
  const zodResult = useMemo(() => {
    return postCreateSchema.safeParse({ content, files });
  }, [content, files]);

  const canUpload = zodResult.success;

  // ✅ 예제처럼: 아무것도 안 썼을 때는 "게시글 내용을 입력해주세요."
  // + 추가로, 파일 개수 초과 같은 에러도 보여주고 싶으면 첫 에러를 띄움
  const helperText = useMemo(() => {
    const isEmpty = content.trim().length === 0 && files.length === 0;
    if (isEmpty) return '게시글 내용을 입력해주세요.';

    if (!zodResult.success) {
      return zodResult.error.issues[0]?.message ?? '';
    }

    return '';
  }, [content, files.length, zodResult]);

  const onClickUpload = async () => {
    if (!canUpload || isSubmitting) return;

    // ✅ 제출 시점엔 parse로 확정(여기서 content trim된 값 사용)
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
          onChangeContent={setContent}
          files={files}
          onChangeFiles={setFiles}
        />

        {/* ✅ fixed 제거: 폼 아래에 자연스럽게 표시 → 이미지랑 안 겹침 */}
        {helperText && <p className="mt-2 text-sm text-red-500">{helperText}</p>}
      </main>
    </>
  );
};

export default PostCreatePage;
