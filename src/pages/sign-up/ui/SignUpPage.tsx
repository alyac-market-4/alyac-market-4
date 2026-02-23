import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { type SignUpFormData, signUpSchema } from '@/features/auth/model/schemas';
import { Button } from '@/shared/ui';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUpMutation } = useAuth();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = (data: SignUpFormData) => {
    setServerError(null);
    signUpMutation.mutate(
      { user: data },
      {
        onSuccess: () => {
          navigate('/profile-setting');
        },
        onError: (error) => {
          setServerError(error.message);
        },
      },
    );
  };

  const onClick = () => {
    navigate('/profile-setting');
  };

  return (
    <div id="root">
      <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-foreground text-3xl font-bold">이메일로 회원가입</h1>
            {serverError && (
              <div className="bg-destructive/10 text-destructive mt-8 flex rounded-lg p-4 text-sm">
                <p className="text-sm font-medium text-red-600">{serverError}</p>
              </div>
            )}
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="이메일" className="text-foreground block text-sm font-medium">
                이메일
              </label>
              <input
                {...form.register('email')}
                className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="이메일"
                placeholder="이메일을 입력하세요."
                type="email"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="비밀번호" className="text-foreground block text-sm font-medium">
                비밀번호
              </label>
              <input
                {...form.register('password')}
                className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="비밀번호"
                placeholder="비밀번호를 입력하세요."
                type="password"
              />
              {form.formState.errors.password?.message && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              variant="alyac"
              size="lgbtn"
              type="submit"
              disabled={!form.formState.isValid || signUpMutation.isPending}
            >
              {signUpMutation.isPending ? '처리 중...' : '다음'}
            </Button>
            <Button variant="alyac" size="lgbtn" onClick={onClick}>
              임시 회원가입
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
