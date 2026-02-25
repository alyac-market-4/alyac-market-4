import { useEffect, useState } from 'react';

import { AuthLinks, SocialLoginButton } from '@/features/auth';
import { fullLogoAlyacNoText } from '@/shared/assets';

export const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative h-screen w-full overflow-hidden bg-[#6FCA3C]">
        <div
          className={`bg-background absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
            showSplash ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-8">
            <img src="/src/shared/assets/images/full-logo-alyac-png.png" alt="alyac-logo" />
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            showSplash ? 'translate-y-200 opacity-0' : 'translate-y-0 opacity-100'
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
                <AuthLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
