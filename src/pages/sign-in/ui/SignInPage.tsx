import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { type SignInFormData, signInSchema } from '@/features/auth/model/schemas';
import { Button } from '@/shared/ui';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { signInMutation } = useAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    signInMutation.mutate(
      { user: data },
      {
        onSuccess: () => {
          navigate('/feed');
        },
        onError: (error) => {
          alert('로그인 실패: ' + error.message);
        },
      },
    );
  };

  return (
    <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold">로그인</h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-foreground block text-sm font-medium">
              이메일
            </label>
            <input
              {...form.register('email')}
              className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="email"
              placeholder="이메일을 입력하세요."
              type="email"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-foreground block text-sm font-medium">
              비밀번호
            </label>
            <input
              {...form.register('password')}
              className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="password"
              placeholder="비밀번호를 입력하세요."
              type="password"
            />
            {form.formState.errors.password?.message && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button
            variant="alyac"
            size="lgbtn"
            type="submit"
            disabled={!form.formState.isValid || signInMutation.isPending}
          >
            {signInMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>

          <div className="text-center">
            <a
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              href="/sign-up"
              data-discover="true"
            >
              이메일로 회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
