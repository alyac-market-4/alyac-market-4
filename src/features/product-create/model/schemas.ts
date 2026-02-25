import { z } from 'zod';

// 상품 생성 폼 스키마
//
// productName - 2~15자
// price - 숫자만 허용
// saleLink - 선택값, URL 형식
export const productCreateSchema = z.object({
  productName: z.string().min(2, '2자 이상 입력해주세요.').max(15, '15자 이하로 입력해주세요.'),

  price: z
    .string()
    .regex(/^\d+$/, '숫자만 입력 가능합니다.')
    .transform((val) => Number(val)), // 문자열 → 숫자 자동 변환

  saleLink: z.string().url('올바른 URL 형식을 입력해주세요.').optional().or(z.literal('')), // 빈 값 허용
});

export type ProductCreateFormData = z.infer<typeof productCreateSchema>;
