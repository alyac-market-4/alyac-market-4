import { FacebookIcon, GoogleIcon, KakaoIcon } from '@/shared/assets';
import { Button } from '@/shared/ui';

// 브랜드별 설정 정보 객체화
const SOCIAL_CONFIG = {
  kakao: {
    icon: <KakaoIcon />,
    label: '카카오톡 계정으로 로그인',
    className: 'border-[#FEE500]! hover:bg-[#FEE500]/10',
  },
  google: {
    icon: <GoogleIcon />,
    label: '구글 계정으로 로그인',
    className: 'border-border hover:bg-muted/50',
  },
  facebook: {
    icon: <FacebookIcon />,
    label: '페이스북 계정으로 로그인',
    className: 'border-[#1877F2]! hover:bg-[#1877F2]/10',
  },
};

interface SocialLoginButtonProps {
  provider: keyof typeof SOCIAL_CONFIG;
  onClick?: () => void;
}

export const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
  const config = SOCIAL_CONFIG[provider];

  return (
    <Button
      variant="login"
      size="loginBtn"
      type="button"
      className={config.className}
      onClick={onClick}
    >
      {config.icon}
      <span className="text-card-foreground flex-1 text-center text-sm font-medium">
        {config.label}
      </span>
    </Button>
  );
};
