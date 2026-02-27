import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUserMutation } from '@/entities/user';
import { FormSubmitButton, useSignUpStore } from '@/features/auth';
import { type SignUpFormData, signUpSchema } from '@/features/auth/model/schemas';
import { Form, FormErrorMessage, FormInputField } from '@/shared/ui';

export const SignUpForm = () => {
  const { setValidated } = useSignUpStore();
  const navigate = useNavigate();
  const { validateEmailMutation } = useUserMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: SignUpFormData) => {
    setServerError(null);
    validateEmailMutation.mutate(data.email, {
      onSuccess: (response) => {
        if (!response.ok) {
          setServerError(response.message);
          return;
        }
        setValidated();
        navigate('/profile-setting', { state: { user: data } });
      },
      onError: () => setServerError('서버 오류가 발생했습니다.'),
    });
  };

  return (
    <div className="space-y-8">
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
            label="다음"
            pendingLabel="처리 중..."
            isPending={validateEmailMutation.isPending}
            isValid={form.formState.isValid}
          />
        </form>
      </Form>
    </div>
  );
};
