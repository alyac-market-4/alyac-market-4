// 게시글 작성 입력값 검증 스키마
// - 게시글 내용(content)과 이미지(files)가 규칙에 맞는지 검사
// - 작성 페이지(PostCreatePage)와 수정 페이지(PostUpdatePage)에서 공통으로 사용
// - Zod를 사용해 글자수, 이미지 개수, 파일 형식, 파일 용량 등을 검증
import { z } from 'zod';

// 게시글 최대 글자수 제한
const MAX_CONTENT = 2200;

// 업로드 가능한 최대 이미지 개수
const MAX_FILES = 3;

// 이미지 파일 최대 용량 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const postCreateSchema = z
  .object({
    // 게시글 내용 검증
    // - 문자열이어야 함
    // - 앞뒤 공백 제거
    // - 최대 글자수 제한
    content: z
      .string()
      .transform((v) => v.trim())
      .refine((v) => v.length <= MAX_CONTENT, {
        message: `게시글은 최대 ${MAX_CONTENT}자까지 입력 가능합니다.`,
      }),

    // 이미지 파일 검증
    // - File 객체 배열이어야 함
    // - 최대 업로드 개수 제한
    // - 이미지 파일만 허용
    // - 파일 용량 제한
    files: z
      .array(z.instanceof(File))
      .max(MAX_FILES, `이미지는 최대 ${MAX_FILES}개까지 업로드 가능합니다.`)
      .refine((arr) => arr.every((f) => f.type.startsWith('image/')), {
        message: '이미지 파일만 업로드할 수 있습니다.',
      })
      .refine((arr) => arr.every((f) => f.size <= MAX_FILE_SIZE), {
        message: `이미지 파일은 ${Math.floor(MAX_FILE_SIZE / (1024 * 1024))}MB 이하만 업로드 가능합니다.`,
      }),
  })

  // 게시글 전체 검증
  // - 내용(content)과 이미지(files)가 모두 비어있는 경우 업로드 불가
  .refine((data) => data.content.length > 0 || data.files.length > 0, {
    message: '게시글 내용을 입력해주세요.',
    path: ['content'],
  });
