import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { FormSubmitButton } from '@/features/auth';
import { type SignInFormData, signInSchema } from '@/features/auth/model/schemas';
import { Form, FormErrorMessage, FormInputField } from '@/shared/ui';

export const SignInForm = () => {
  const navigate = useNavigate();
  const { signInMutation } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: SignInFormData) => {
    setServerError(null);
    signInMutation.mutate(
      { user: data },
      {
        onSuccess: () => navigate('/feed'),
        onError: () => setServerError('이메일 또는 비밀번호가 일치하지 않습니다.'),
      },
    );
  };

  return (
    <>
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
    </>
  );
};
