// 게시물 내용/이미지 입력 상태를 관리하고 이미지 업로드 후 게시물 생성 API를 호출하는 업로드 페이지
import { useMemo, useState } from 'react';

import axios from 'axios';

import { useCreatePost } from '@/entities/post';
import { useUploadFiles } from '@/entities/upload';
import { PostCreateForm, PostSubmitButton, postCreateSchema } from '@/features/post-create';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const PostCreatePage = () => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  // 처음엔 에러/안내문을 숨기고, 한 번이라도 입력/선택을 하면 그때부터 보여주기
  const [isTouched, setIsTouched] = useState(false);

  const uploadMutation = useUploadFiles();
  const { mutateAsync: createPostAsync, isPending: isCreatePostPending } = useCreatePost();

  // 업로드 요청 or 게시물 생성 요청 중 하나라도 진행중이면 제출중 처리
  // (중복 클릭 방지 / 버튼 비활성화)
  const isSubmitting = uploadMutation.isPending || isCreatePostPending;

  // Zod로 "현재 입력 상태"가 유효한지 검사
  // - content / files 규칙(예: 글자수, 이미지 개수, 용량 등)을 스키마에서 판단
  const zodResult = useMemo(() => {
    return postCreateSchema.safeParse({ content, files });
  }, [content, files]);

  // 스키마 통과하면 업로드 버튼 활성화
  const canUpload = zodResult.success;

  // 화면 하단 안내 문구
  const helperText = useMemo(() => {
    // 처음 진입 시엔 아무것도 안 보여줌 (예제 UX처럼)
    if (!isTouched) return '';

    // 빈 상태면 “내용 입력” 안내
    const isEmpty = content.trim().length === 0 && files.length === 0;
    if (isEmpty) return '게시글 내용을 입력해주세요.';

    // 그 외(이미지 4개 초과, 용량 초과 등) 스키마 에러 표시
    if (!zodResult.success) return zodResult.error.issues[0]?.message ?? '';

    return '';
  }, [isTouched, content, files, zodResult]);

  const onClickUpload = async () => {
    // 업로드 버튼을 눌렀다는 것 자체도 "사용자가 상호작용했다"로 보고
    // 아무것도 입력 안 했을 때 안내문이 뜨도록 touched 처리
    if (!isTouched) setIsTouched(true);

    // 유효하지 않거나(스키마 실패), 제출중이면 막기
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

      await createPostAsync({
        content: safeContent,
        image,
      });
    } catch (err) {
      // 실패 원인은 개발자가 콘솔에서 확인할 수 있게 남김
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

      alert('업로드/등록 중 오류가 발생했습니다.');
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
            // 한 번이라도 입력하면 touched
            if (!isTouched) setIsTouched(true);
            setContent(next);
          }}
          files={files}
          onChangeFiles={(next) => {
            // 이미지 선택도 touched로 취급
            if (!isTouched) setIsTouched(true);
            setFiles(next);
          }}
        />

        {helperText && <p className="mt-2 text-sm text-red-500">{helperText}</p>}
      </main>
    </>
  );
};
