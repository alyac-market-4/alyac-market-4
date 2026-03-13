// 게시물 업로드 페이지
// - pages 레이어에서는 "게시물 작성 화면" 자체를 담당
// - 실제 입력 폼 UI는 widgets/post-form의 PostForm을 사용
// - 게시글 생성 API는 entities/post, 이미지 업로드 API는 entities/upload 훅 사용
// - 입력값 검증은 postCreateSchema(Zod)에 맡기고,
//   이 페이지는 검증 결과를 이용해 업로드 가능 여부와 안내 메시지를 제어한다.
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
  // 게시글 내용
  const [content, setContent] = useState('');

  // 업로드할 이미지 파일 목록
  const [files, setFiles] = useState<File[]>([]);

  // 사용자가 한 번이라도 입력/이미지 선택을 했는지 여부
  // (에러 메시지를 언제부터 보여줄지 판단하기 위해 사용)
  const [isTouched, setIsTouched] = useState(false);

  // 첫 입력/선택 시 touched 상태를 활성화하는 함수
  const touch = () => {
    if (!isTouched) setIsTouched(true);
  };

  // 이미지 업로드 API 훅
  const uploadMutation = useUploadFiles();

  // 게시글 생성 API 훅
  const { mutateAsync: createPostAsync, isPending: isCreatePostPending } = useCreatePost();

  // 이미지 업로드 중이거나 게시글 생성 중이면 제출 중 상태
  const isSubmitting = uploadMutation.isPending || isCreatePostPending;

  // 입력값을 Zod 스키마로 검증
  // (content, files가 변경될 때만 다시 계산)
  const zodResult = useMemo(() => {
    return postCreateSchema.safeParse({ content, files });
  }, [content, files]);

  // 스키마 검증에 성공했을 때만 업로드 가능
  const canUpload = zodResult.success;

  // 화면에 보여줄 안내 메시지
  const helperText = useMemo(() => {
    // 아직 사용자가 입력하지 않았다면 메시지 표시 안 함
    if (!isTouched) return '';

    // 검증 실패 시 첫 번째 에러 메시지를 표시
    if (!zodResult.success) return zodResult.error.issues[0]?.message ?? '';

    return '';
  }, [isTouched, zodResult]);

  // 업로드 버튼 클릭 시 실행되는 함수
  const onClickUpload = async () => {
    // 첫 클릭 시 입력 시작 상태로 변경 (에러 메시지 표시 시작)
    touch();

    // 검증 실패거나 이미 제출 중이면 중단
    if (!canUpload || isSubmitting) return;

    // 스키마로 한번 더 안전하게 파싱
    const parsed = postCreateSchema.parse({ content, files });
    const safeContent = parsed.content;
    const safeFiles = parsed.files;

    try {
      let image = '';

      // 이미지가 존재하면 먼저 파일 업로드 실행
      if (safeFiles.length > 0) {
        const uploaded = await uploadMutation.mutateAsync(safeFiles);

        // 업로드된 파일명을 콤마 문자열로 변환 (API 규격)
        image = uploaded.map((item) => item.filename).join(',');
      }

      // 게시글 생성 API 호출
      await createPostAsync(
        {
          content: safeContent || ' ',
          image,
        },
        {
          onSuccess: () => {
            // 성공 시 토스트 메시지
            toast.success('게시글이 등록되었습니다.');
          },
        },
      );
    } catch (err) {
      // 업로드 또는 게시글 생성 실패 로그
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

      // 사용자에게 실패 안내
      toast.error('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <>
      {/* 상단 헤더 영역 (뒤로가기 + 업로드 버튼) */}
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canUpload || isSubmitting} onClick={onClickUpload} />}
      />

      <main className="px-4 py-6">
        {/* 게시글 입력 폼 */}
        <PostForm
          content={content}
          onChangeContent={(next) => {
            touch();
            setContent(next);
          }}
          files={files}
          onChangeFiles={(next) => {
            touch();
            setFiles(next);
          }}
        />

        {/* 검증 실패 시 안내 메시지 표시 */}
        {helperText && <p className="mt-2 ml-[68px] text-sm text-red-500">{helperText}</p>}
      </main>
    </>
  );
};
