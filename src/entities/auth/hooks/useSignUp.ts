import { useMutation } from '@tanstack/react-query';

import { useConfirmDialogStore } from '@/shared/lib';

import { authApi } from '../api/authApi';
import type { SignUpFormData } from '../model/types';

export const useSignUp = () => {
  const { openConfirm } = useConfirmDialogStore();

  return useMutation({
    mutationFn: (userInfo: SignUpFormData) => authApi.signUp({ user: userInfo }),
    onSuccess: () => {
      openConfirm({
        title: '회원가입이 완료되었습니다!',
        description: '로그인 해 주세요.',
        isAlert: true,
        cancelText: '확인',
      });
    },
  });
};
