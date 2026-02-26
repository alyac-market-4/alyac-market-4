import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { type SignInFormData, signInSchema } from '@/features/auth/model/schemas';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputGroup,
  InputGroupInput,
} from '@/shared/ui';

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

          {serverError && (
            <div className="bg-destructive/10 text-destructive mt-8 flex rounded-lg p-4 text-sm">
              <p className="text-sm font-medium text-red-600">{serverError}</p>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
            {/* 이메일 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <InputGroup variant="auth" size="auth">
                      <InputGroupInput placeholder="이메일을 입력하세요." type="email" {...field} />
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <InputGroup variant="auth" size="auth">
                      <InputGroupInput
                        placeholder="비밀번호를 입력하세요."
                        type="password"
                        {...field}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="alyac"
              size="lgbtn"
              disabled={!form.formState.isValid || signInMutation.isPending}
            >
              {signInMutation.isPending ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </Form>
        <div className="text-muted-foreground flex items-center justify-center text-sm">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hover:text-foreground hover:bg-transparent"
          >
            <Link to="/sign-up">{'이메일로 회원가입'}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
