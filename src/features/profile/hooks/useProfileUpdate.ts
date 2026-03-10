import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type ProfileFormData, profileSchema } from '@/entities/profile';
import { useUpdateProfile } from '@/entities/profile';

export const useProfileUpdate = (user: ProfileFormData & { image?: string }) => {
  const navigate = useNavigate();
  const { mutateAsync: updateProfileAsync } = useUpdateProfile();

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
      await updateProfileAsync(
        {
          user: {
            username: data.username,
            accountname: data.accountname,
            intro: data.intro ?? '',
            image: profileImageUrl,
          },
        },
        {
          onSuccess: () => {
            toast.success('프로필을 수정했습니다.');
          },
          onError: () => {
            toast.error('프로필 수정에 실패했습니다.');
          },
        },
      );
      navigate('/profile');
    } catch {
      toast.error('서버 오류가 발생했습니다.');
    }
  };

  return {
    form,
    setProfileImageUrl,
    onSubmit,
  };
};
