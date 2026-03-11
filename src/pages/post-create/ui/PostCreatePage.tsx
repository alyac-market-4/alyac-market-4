// 게시물 업로드 페이지
// - pages에서는 "게시물 작성 화면" 자체를 담당
// - 실제 입력 폼 UI는 features/post의 PostForm을 가져와서 재사용
// - 게시글 생성 API는 entities/post, 이미지 업로드 API는 entities/upload 훅을 사용
// - 입력값 검증 규칙은 postCreateSchema에 맡기고, 이 페이지는 검증 결과를 표시하는 역할만 담당
import { useMemo, useState } from 'react';

import axios from 'axios';
import { toast } from 'sonner';

import { useCreatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { PostSubmitButton, postCreateSchema } from '@/features/post';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { PostForm } from '@/widgets/post-form';

export const PostCreatePage = () => {
  // 페이지 내부 상태
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isTouched, setIsTouched] = useState(false);

  // API 훅
  const uploadMutation = useUploadFiles();
  const { mutateAsync: createPostAsync, isPending: isCreatePostPending } = useCreatePost();

  // 제출 중 상태
  const isSubmitting = uploadMutation.isPending || isCreatePostPending;

  // 입력값 검증
  const zodResult = useMemo(() => {
    return postCreateSchema.safeParse({ content, files });
  }, [content, files]);

  // 업로드 가능 여부
  const canUpload = zodResult.success;

  // 안내 메시지
  const helperText = useMemo(() => {
    if (!isTouched) return '';
    if (!zodResult.success) return zodResult.error.issues[0]?.message ?? '';
    return '';
  }, [isTouched, zodResult]);

  // 업로드 처리
  const onClickUpload = async () => {
    if (!isTouched) setIsTouched(true);

    if (!canUpload || isSubmitting) return;

    const parsed = postCreateSchema.parse({ content, files });
    const safeContent = parsed.content;
    const safeFiles = parsed.files;

    try {
      let image = '';

      // 이미지가 있으면 먼저 업로드
      if (safeFiles.length > 0) {
        const uploaded = await uploadMutation.mutateAsync(safeFiles);
        image = uploaded.map((item) => item.filename).join(',');
      }

      // 게시글 생성
      await createPostAsync(
        {
          content: safeContent || ' ',
          image,
        },
        {
          onSuccess: () => {
            toast.success('게시글이 등록되었습니다.');
          },
        },
      );
    } catch (err) {
      // 업로드/생성 실패 로그
      if (axios.isAxiosError(err)) {
        console.error('UPLOAD/CREATE AXIOS ERROR', {
          message: err.message,
          code: err.code,
          url: err.config?.url,
          baseURL: err.config?.baseURL,
          method: err.config?.method,
          status: err.response?.status,
          data: err.response?.data,
        });
      } else {
        console.error('UPLOAD/CREATE ERROR:', err);
      }

      toast.error('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canUpload || isSubmitting} onClick={onClickUpload} />}
      />

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
        />

        {helperText && <p className="mt-2 text-sm text-red-500">{helperText}</p>}
      </main>
    </>
  );
};
