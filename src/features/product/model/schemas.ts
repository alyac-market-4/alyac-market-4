import { z } from 'zod';

export const productSchema = z.object({
  productName: z
    .string()
    .trim() // 앞뒤 공백 제거
    .min(2, '상품명은 2자 이상 입력해주세요.')
    .max(15, '상품명은 15자 이하로 입력해주세요.'),

  // transform에서 콤마 제거 후 숫자 검증
  price: z
    .string()
    .trim()
    .min(1, '가격을 입력해주세요.')
    .transform((val) => val.replaceAll(',', ''))
    .pipe(
      z
        .string()
        .regex(/^\d+$/, '숫자만 입력 가능합니다.')
        .transform((val) => Number(val)),
    ),

  saleLink: z.string().trim().url('올바른 URL 형식을 입력해주세요.').optional().or(z.literal('')),
});

export type ProductFormData = z.infer<typeof productSchema>;
