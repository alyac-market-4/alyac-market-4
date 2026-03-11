import { skipToken } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { type Profile, useUserProfile } from '@/entities/profile';
import { ProfileFormFields, useProfileUpdate } from '@/features/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { BackButton, Button, Form, Spinner } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProfileUpdatePage = () => {
  const location = useLocation();
  const locationUser: Profile = location.state?.user;
  const { data: profileData, isLoading } = useUserProfile(
    locationUser ? skipToken : getTokenUserInfo().accountname,
  );

  const user = locationUser ?? profileData;

  if (!locationUser && isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-primary size-16" />
      </div>
    );
  if (!user) return null;

  return <ProfileUpdateForm user={user} />;
};

const ProfileUpdateForm = ({ user }: { user: Profile }) => {
  const { form, setProfileImageUrl, onSubmit } = useProfileUpdate(user);

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            variant="alyac"
            type="submit"
            form="profile-form"
            disabled={!form.formState.isValid}
          >
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
