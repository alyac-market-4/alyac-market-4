import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { AuthLinks } from '@/features/auth';
import { useConfirmDialogStore } from '@/shared/lib';
import { SignInForm } from '@/widgets/auth';

export const SignInPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { openConfirm } = useConfirmDialogStore();

  useEffect(() => {
    if (state?.message) {
      openConfirm({
        title: state.message,
        description: '로그인 후 이용해주세요.',
        isAlert: true,
        cancelText: '확인',
      });

      navigate('.', { replace: true, state: null });
    }
  }, [state?.message, openConfirm, navigate]);

  return (
    <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold">로그인</h1>
        </div>
        <SignInForm />
        <AuthLinks mode="signin" />
      </div>
    </div>
  );
};
