import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

interface LinkButtonProps {
  label: string;
  path: string;
}

const LinkButton = ({ label, path }: LinkButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(path)}
      className="hover:text-foreground text-muted-foreground hover:bg-transparent"
    >
      {label}
    </Button>
  );
};

interface AuthLinksProps {
  mode?: 'all' | 'signin' | 'signup';
}

export const AuthLinks = ({ mode = 'all' }: AuthLinksProps) => {
  const signUpLabel = mode === 'signin' ? '이메일로 회원가입' : '회원가입';

  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
      {(mode === 'all' || mode === 'signup') && (
        <LinkButton label="이메일로 로그인" path="/sign-in" />
      )}

      {mode === 'all' && (
        <span className="text-muted-foreground/30" aria-hidden="true">
          |
        </span>
      )}

      {(mode === 'all' || mode === 'signin') && <LinkButton label={signUpLabel} path="/sign-up" />}
    </div>
  );
};
