import { z } from 'zod';

/**
 * 계정 검색 키워드 스키마
 * - trim
 * - 빈 값은 "검색하지 않음" 처리(에러로 띄우지 않게 페이지에서 분기)
 * - 너무 긴 입력만 에러로 표시
 */
export const accountSearchKeywordSchema = z
  .string()
  .transform((v) => v.trim())
  .refine((v) => v.length <= 30, {
    message: '검색어는 최대 30자까지 입력 가능합니다.',
  });

export type AccountSearchKeyword = z.infer<typeof accountSearchKeywordSchema>;
