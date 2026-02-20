import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { Button } from '@/shared/ui';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { signInMutation } = useAuth();

  const onClick = () => {
    // TODO: 임시 로그인
    signInMutation.mutate({ user: { email: 'test@test.com', password: '11111111' } });
    navigate('/feed');
  };

  return (
    <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold">로그인</h1>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="이메일" className="text-foreground block text-sm font-medium">
              이메일
            </label>
            <input
              className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="이메일"
              placeholder="이메일을 입력하세요."
              type="email"
              value=""
              name="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="비밀번호" className="text-foreground block text-sm font-medium">
              비밀번호
            </label>
            <input
              className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="비밀번호"
              placeholder="비밀번호를 입력하세요."
              type="password"
              value=""
              name="password"
            />
          </div>
          <Button onClick={onClick}>로그인</Button>
          <div className="text-center">
            <a
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              href="/sign-up"
              data-discover="true"
            >
              이메일로 회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
