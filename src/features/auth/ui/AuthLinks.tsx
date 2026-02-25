import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui';

const AUTH_LINKS = [
  { label: '이메일로 로그인', to: '/sign-in' },
  { label: '회원가입', to: '/sign-up' },
] as const;

export const AuthLinks = () => {
  return (
    <div className="text-muted-foreground mt-4 flex items-center justify-center text-sm">
      {AUTH_LINKS.map((item, index) => (
        <div key={item.to} className="flex items-center">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hover:text-foreground hover:bg-transparent"
          >
            <Link to={item.to}>{item.label}</Link>
          </Button>

          {index < AUTH_LINKS.length - 1 && (
            <span className="text-muted-foreground/30 mx-2" aria-hidden="true">
              |
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
