import { useLocation } from 'react-router-dom';

import { FormSubmitButton } from '@/features/auth';
import { ProfileFormFields, useProfileSetting } from '@/features/profile';
import { Form } from '@/shared/ui';

export const ProfileSettingPage = () => {
  const location = useLocation();
  const user = location.state?.user;

  const { form, setProfileImageUrl, onSubmit, isPending } = useProfileSetting(user);

  return (
    <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground mb-2 text-3xl font-bold">프로필 설정</h1>
          <p className="text-muted-foreground text-sm">나중에 언제든지 변경할 수 있습니다.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <ProfileFormFields
              control={form.control}
              initialImage={user?.image}
              username={user?.username}
              onUploadComplete={setProfileImageUrl}
              isAccountnameDisabled={false}
            />
            <FormSubmitButton
              label="알약마켓 시작하기"
              pendingLabel="처리 중..."
              isPending={isPending}
              isValid={form.formState.isValid}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
