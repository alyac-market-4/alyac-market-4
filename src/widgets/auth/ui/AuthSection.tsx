import { AuthLinks, SocialLoginButton } from '@/features/auth';
import { fullLogoAlyacNoText } from '@/shared/assets';

interface AuthSectionProps {
  isVisible: boolean;
}

export const AuthSection = ({ isVisible }: AuthSectionProps) => {
  return (
    <div
      className={`absolute inset-0 transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="relative flex h-full flex-col bg-[#6FCA3C]">
        <div className="flex flex-1 items-center justify-center">
          <img src={fullLogoAlyacNoText} alt="alyac-logo" />
        </div>

        <div className="bg-card rounded-t-[40px] px-6 pt-16 pb-24">
          <div className="mx-auto flex max-w-md flex-col gap-4">
            <SocialLoginButton provider="kakao" />
            <SocialLoginButton provider="google" />
            <SocialLoginButton provider="facebook" />
            <AuthLinks mode="all" />
          </div>
        </div>
      </div>
    </div>
  );
};
