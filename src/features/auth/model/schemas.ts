import { z } from 'zod';

const emailSchema = z.email('올바른 이메일 형식을 입력해주세요.').trim();
const passwordSchema = z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.').trim();

//회원가입
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

//로그인
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, '비밀번호를 입력해주세요.'),
});

// 타입 추론
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
