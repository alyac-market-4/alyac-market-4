import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

export const AuthLinks = () => {
  const navigate = useNavigate();

  return (
    <div className="text-muted-foreground mt-4 flex items-center justify-center gap-4 text-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/sign-in')}
        className="hover:text-foreground hover:bg-transparent"
      >
        이메일로 로그인
      </Button>

      <span className="text-muted-foreground/30" aria-hidden="true">
        |
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/sign-up')}
        className="hover:text-foreground hover:bg-transparent"
      >
        회원가입
      </Button>
    </div>
  );
};
