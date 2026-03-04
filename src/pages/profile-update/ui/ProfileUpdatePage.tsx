import { useLocation } from 'react-router-dom';

import { ProfileFormFields } from '@/features/profile';
import { useProfileUpdate } from '@/features/profile/hooks/useProfileUpdate';
import { BackButton, Button, Form } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProfileUpdatePage = () => {
  const location = useLocation();
  const user = location.state?.user;

  const { form, setProfileImageUrl, onSubmit } = useProfileUpdate(user);

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
      <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="profile-form"
              className="flex flex-col gap-6"
            >
              <ProfileFormFields
                control={form.control}
                initialImage={user?.image}
                username={user?.username}
                onUploadComplete={setProfileImageUrl}
                isAccountnameDisabled={true}
              />
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
