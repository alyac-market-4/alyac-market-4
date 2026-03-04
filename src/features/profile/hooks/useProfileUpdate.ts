import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUserMutation } from '@/entities/user';
import { type ProfileFormData, profileSchema } from '@/features/profile';

export const useProfileUpdate = (user: ProfileFormData & { image?: string }) => {
  const navigate = useNavigate();
  const { updateProfileMutation } = useUserMutation();

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
    try {
      await updateProfileMutation.mutateAsync({
        user: {
          username: data.username,
          accountname: data.accountname,
          intro: data.intro ?? '',
          image: profileImageUrl,
        },
      });
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    form,
    setProfileImageUrl,
    onSubmit,
  };
};
