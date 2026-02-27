import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { useUserMutation } from '@/entities/user';
import { FormSubmitButton, useSignUpStore } from '@/features/auth';
import { type ProfileFormData, profileSchema } from '@/features/profile/model/schemas';
import { Form, FormInputField, ProfileAvatarEditor } from '@/shared/ui';

export const ProfileSettingPage = () => {
  const navigate = useNavigate();
  const { signUpMutation } = useAuth();
  const { validateAccountnameMutation } = useUserMutation();

  const location = useLocation();
  const user = location.state?.user;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      accountname: '',
      intro: '',
    },
  });

  const { reset } = useSignUpStore();
  const isFirstRender = useRef(true);
  useEffect(() => {
    return () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      reset();
    };
  }, []);

  //TODO: 프로필 이미지 업로드 구현.

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) {
      alert('이전 단계 데이터가 없습니다.'); //TODO 모달로 변경
      navigate('/sign-up');
      return;
    }

    try {
      const response = await validateAccountnameMutation.mutateAsync(data.accountname);
      if (!response.ok) {
        form.setError('accountname', {
          type: 'server',
          message: response.message,
        });
        return;
      }

      const userInfo = {
        ...user,
        ...data,
        image: `${user?.image}`, //TODO: 업로드한 이미지가 들어오도록 변경
      };

      await signUpMutation.mutateAsync(userInfo);
      navigate('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-foreground mb-2 text-3xl font-bold">프로필 설정</h1>
            <p className="text-muted-foreground text-sm">나중에 언제든지 변경할 수 있습니다.</p>
          </div>

          <div className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <ProfileAvatarEditor src={user?.image} alt="프로필 이미지" />
                  </div>
                </div>

                <FormInputField
                  control={form.control}
                  name="username"
                  label="사용자 이름"
                  placeholder="이름을 입력하세요."
                  type="text"
                />

                <FormInputField
                  control={form.control}
                  name="accountname"
                  label="계정 ID"
                  placeholder="계정 아이디를 입력하세요."
                  type="text"
                />

                <FormInputField
                  control={form.control}
                  name="intro"
                  label="소개"
                  placeholder="간단한 자기 소개를 입력하세요."
                  type="text"
                />

                <FormSubmitButton
                  label="알약마켓 시작하기"
                  pendingLabel="처리 중..."
                  isPending={signUpMutation.isPending}
                  isValid={form.formState.isValid}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
