import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { type ProfileFormData, ProfileImageUpload, profileSchema } from '@/features/profile';
import { BackButton, Button, Form, FormInputField } from '@/shared/ui';
import { Header } from '@/widgets/header';

/*
TODO : 엔티티에 들어가있는 뮤테이트 api 위치 수정
트라이 캐치 구현
컴포넌트화
App.css의 primary 컬러 주석 누가한거임?
*/
export const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const { profileUpdateMutation } = useProfile();

  const location = useLocation();
  const user = location.state?.user;
  const [profileImageUrl, setProfileImageUrl] = useState<string>(user?.image ?? '');

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      username: user?.username ?? '',
      accountname: user?.accountname ?? '',
      intro: user?.intro ?? '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    await profileUpdateMutation.mutateAsync({
      user: {
        username: data.username,
        accountname: data.accountname,
        intro: data.intro ?? '',
        image: profileImageUrl,
      },
    });
    navigate('/profile');
  };

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button variant="alyac" type="submit" form="profile-form">
            저장
          </Button>
        }
      />
      <div>
        <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  id="profile-form"
                  className="flex flex-col gap-6"
                >
                  <div className="flex justify-center">
                    <ProfileImageUpload
                      initialImage={user?.image}
                      alt={user?.username ?? '프로필 이미지'}
                      onUploadComplete={(filename) => setProfileImageUrl(filename)}
                    />
                  </div>

                  <FormInputField
                    control={form.control}
                    name="username"
                    label="사용자 이름"
                    placeholder="이름을 입력하세요."
                    type="text"
                  />

                  <div className="flex flex-col gap-1">
                    <FormInputField
                      control={form.control}
                      name="accountname"
                      label="계정 ID"
                      placeholder="계정 아이디를 입력하세요."
                      type="text"
                      disabled
                    />
                    <p className="text-muted-foreground text-xs">계정 ID는 변경할 수 없습니다.</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <FormInputField
                      control={form.control}
                      name="intro"
                      label="소개"
                      placeholder="간단한 자기 소개를 입력하세요."
                      type="text"
                    />
                    <p className="text-muted-foreground text-xs">최대 60자</p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
