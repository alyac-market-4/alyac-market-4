import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { type ProfileFormData, profileSchema } from '@/features/profile';
import { BackButton, Button, Form, FormInputField } from '@/shared/ui';
import { Header } from '@/widgets/header';

//TODO: 프로필 페이지 구현하기
export const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const { signUpMutation } = useAuth();

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

  const onSubmit = async (data: ProfileFormData) => {
    const userInfo = {
      ...user,
      ...data,
      image: `${user?.image}`, //TODO: 업로드한 이미지가 들어오도록 변경
    };

    await signUpMutation.mutateAsync(userInfo);
    navigate('/sign-in');
  };

  return (
    <>
      <Header left={<BackButton />} right={<Button>저장</Button>} />
      <div>
        <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                  <div className="flex justify-center">
                    <div className="relative"></div>
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
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
