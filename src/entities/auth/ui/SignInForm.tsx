import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { type SignInRequest, useSignIn } from '@/entities/auth';

const signInSchema = z.object({
  email: z.email('올바른 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상입니다'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    const requestPayload: SignInRequest = {
      user: data,
    };

    signInMutation.mutate(requestPayload, {
      onSuccess: () => {
        navigate('/feed');
      },
      onError: (error) => {
        alert('로그인 실패: ' + error.message);
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('email')} placeholder="Email" />
      {form.formState.errors.email && <span>{form.formState.errors.email.message}</span>}

      <input {...form.register('password')} type="password" placeholder="Password" />
      {form.formState.errors.password && <span>{form.formState.errors.password.message}</span>}

      <button type="submit" disabled={signInMutation.isPending}>
        {signInMutation.isPending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
};
