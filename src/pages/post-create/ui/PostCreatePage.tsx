// 게시물 업로드 페이지
// - pages에서는 "게시물 작성 화면" 자체를 담당
// - 실제 입력 폼 UI는 features/post의 PostForm을 가져와서 재사용
// - 게시글 생성 API는 entities/post, 이미지 업로드 API는 entities/upload 훅을 사용
// - 이 파일은 공통 기능들을 조합해서 "업로드 페이지"를 만드는 역할
import { useMemo, useState } from 'react';

import axios from 'axios';
import { toast } from 'sonner';

// entities/post
// - 최종 게시글 생성 요청(useCreatePost)
import { useCreatePost } from '@/entities/post';
// entities/upload
// - 사용자가 선택한 이미지 파일 업로드 요청(useUploadFiles)
import { useUploadFiles } from '@/entities/upload';
// features/post
// - 작성/수정 공통 폼 UI(PostForm)
// - 작성/수정 공통 제출 버튼(PostSubmitButton)
// - 작성 페이지 검증 규칙(postCreateSchema)
import { PostForm, PostSubmitButton, postCreateSchema } from '@/features/post';
// shared/ui, widgets
// - 페이지 공통 뒤로가기 버튼 / 헤더
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const PostCreatePage = () => {
  // 페이지 내부 상태
  // - content: 작성 중인 게시글 내용
  // - files: 사용자가 새로 선택한 이미지 파일 목록
  // - isTouched: 사용자가 한 번이라도 입력/선택을 시작했는지 여부
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isTouched, setIsTouched] = useState(false);

  // API 훅
  // - uploadMutation: 이미지 업로드 요청
  // - createPostAsync: 게시글 생성 요청
  const uploadMutation = useUploadFiles();
  const { mutateAsync: createPostAsync, isPending: isCreatePostPending } = useCreatePost();

  // 업로드 중이거나 게시글 생성 요청 중이면 제출 중 상태로 처리
  const isSubmitting = uploadMutation.isPending || isCreatePostPending;

  // 작성 페이지 입력값 검증
  // - postCreateSchema를 사용해 현재 content / files 상태가 유효한지 검사
  const zodResult = useMemo(() => {
    return postCreateSchema.safeParse({ content, files });
  }, [content, files]);

  // 스키마 검증을 통과하면 업로드 버튼 활성화
  const canUpload = zodResult.success;

  // 작성 페이지 안내문 계산
  // - 처음엔 숨김
  // - 내용/이미지가 모두 없으면 "게시글 내용을 입력해주세요."
  // - 그 외에는 스키마 에러(개수 초과, 용량 초과 등) 표시
  const helperText = useMemo(() => {
    if (!isTouched) return '';

    const isEmpty = content.trim().length === 0 && files.length === 0;
    if (isEmpty) return '게시글 내용을 입력해주세요.';

    if (!zodResult.success) return zodResult.error.issues[0]?.message ?? '';

    return '';
  }, [isTouched, content, files, zodResult]);

  // 업로드 버튼 클릭 시 최종 처리
  // 1) 새 이미지가 있으면 먼저 업로드
  // 2) 업로드된 이미지 filename들을 하나의 문자열로 합침
  // 3) 게시글 생성 API 호출
  const onClickUpload = async () => {
    if (!isTouched) setIsTouched(true);

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
      // 업로드/생성 실패 시 개발자 확인용 콘솔 로그 + 사용자 토스트 안내
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

      toast.error('업로드/등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {/* 공통 헤더 UI 재사용 */}
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canUpload || isSubmitting} onClick={onClickUpload} />}
      />

      {/* 공통 폼 UI 재사용
          - PostForm은 작성 페이지와 수정 페이지가 같이 쓰는 입력 폼
          - 작성 페이지에서는 기존 이미지가 없으므로 content / files 관련 props만 전달 */}
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

        {/* 작성 페이지 검증 안내문 표시 */}
        {helperText && <p className="mt-2 text-sm text-red-500">{helperText}</p>}
      </main>
    </>
  );
};
