import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { useUserMutation } from '@/entities/user';
import { useSignUpStore } from '@/features/auth';
import { type ProfileFormData, profileSchema } from '@/features/profile';

export const useProfileSetting = (user: ReturnType<typeof useLocation>['state']['user']) => {
  const navigate = useNavigate();
  const { signUpMutation } = useAuth();
  const { validateAccountnameMutation } = useUserMutation();
  const { reset } = useSignUpStore();

  const [profileImageUrl, setProfileImageUrl] = useState<string>(user?.image ?? '');

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: { username: '', accountname: '', intro: '' },
  });

  // 페이지 언마운트 시 signUpStore 초기화
  const isFirstRender = useRef(true);
  useEffect(() => {
    return () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) {
      alert('이전 단계 데이터가 없습니다.');
      navigate('/sign-up');
      return;
    }

    try {
      const response = await validateAccountnameMutation.mutateAsync(data.accountname);
      if (!response.ok) {
        form.setError('accountname', { type: 'server', message: response.message });
        return;
      }

      await signUpMutation.mutateAsync({ ...user, ...data, image: profileImageUrl });
      navigate('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    form,
    profileImageUrl,
    setProfileImageUrl,
    onSubmit,
    isPending: signUpMutation.isPending,
  };
};
