import { z } from 'zod';

// 이미지 파일 최대 용량 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const productSchema = z.object({
  // 이미지 파일 검증 (1장, 선택은 폼에서 따로 체크)
  file: z
    .instanceof(File)
    .refine((f) => f.type.startsWith('image/'), {
      message: '이미지 파일만 업로드할 수 있습니다.',
    })
    .refine((f) => f.size <= MAX_FILE_SIZE, {
      message: `이미지는 ${MAX_FILE_SIZE / (1024 * 1024)}MB 이하만 업로드 가능합니다.`,
    })
    .optional(),

  // 상품명 - 2~15자, 앞뒤 공백 제거 (필수 입력)
  productName: z
    .string()
    .trim()
    .min(2, '상품명은 2자 이상 입력해주세요.')
    .max(15, '상품명은 15자 이하로 입력해주세요.'),

  // 가격 - 숫자만 허용, 콤마는 입력 허용하되 검증 시 제거 (필수 입력)
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

  // 판매 링크 - URL 형식 검증 (필수 입력)
  saleLink: z
    .string()
    .trim()
    .min(1, '판매 링크를 입력해주세요.')
    .url('올바른 URL 형식을 입력해주세요.'),
});

export type ProductFormData = z.infer<typeof productSchema>;
