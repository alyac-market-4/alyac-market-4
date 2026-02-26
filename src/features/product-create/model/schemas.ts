import { z } from 'zod';

/**
 * 상품 생성 폼 스키마
 *
 * productName - 필수, 2~15자, 앞뒤 공백 제거
 * price - 필수, 숫자만 허용, number 타입으로 변환
 * saleLink - 선택, URL 형식, 빈 문자열 허용
 */
export const productCreateSchema = z.object({
  productName: z
    .string()
    .trim() // 앞뒤 공백 제거
    .min(2, '상품명은 2자 이상 입력해주세요.')
    .max(15, '상품명은 15자 이하로 입력해주세요.'),

  price: z
    .string()
    .trim()
    .min(1, '가격을 입력해주세요.')
    .regex(/^\d+$/, '숫자만 입력 가능합니다.')
    .transform((val) => Number(val.replaceAll(',', ''))),

  saleLink: z.string().trim().url('올바른 URL 형식을 입력해주세요.').optional().or(z.literal('')),
});

export type ProductCreateFormData = z.infer<typeof productCreateSchema>;
