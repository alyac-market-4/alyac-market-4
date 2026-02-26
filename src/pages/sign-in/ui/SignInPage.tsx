import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { AuthLinks, FormSubmitButton } from '@/features/auth';
import { type SignInFormData, signInSchema } from '@/features/auth/model/schemas';
import { Form, FormErrorMessage, FormInputField } from '@/shared/ui';

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

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = (data: SignInFormData) => {
    setServerError(null);
    signInMutation.mutate(
      { user: data },
      {
        onSuccess: () => {
          navigate('/feed');
        },
        onError: () => {
          setServerError('이메일 또는 비밀번호가 일치하지 않습니다.');
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
        <FormErrorMessage message={serverError} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInputField
              control={form.control}
              name="email"
              label="이메일"
              placeholder="이메일을 입력하세요."
              type="email"
            />
            <FormInputField
              control={form.control}
              name="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
              type="password"
            />
            <FormSubmitButton
              label="로그인"
              pendingLabel="로그인 중..."
              isPending={signInMutation.isPending}
              isValid={form.formState.isValid}
            />
          </form>
        </Form>

        <AuthLinks mode="signin" />
      </div>
    </div>
  );
};
