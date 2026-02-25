import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { FacebookIcon, GoogleIcon, KakaoIcon } from '@/shared/assets';
import { Button } from '@/shared/ui';

export const HomePage = () => {
  const navigate = useNavigate();
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
              <img src="/src/shared/assets/images/full-logo-alyac-no-text.png" alt="alyac-logo" />
            </div>

            <div className="bg-card rounded-t-[40px] px-6 pt-16 pb-24">
              <div className="mx-auto flex max-w-md flex-col gap-4">
                <button
                  className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground bg-card inline-flex h-auto w-full max-w-[448px] min-w-[322px] cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#FEE500]! px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors hover:bg-[#FEE500]/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                  type="button"
                >
                  <KakaoIcon />
                  <span className="text-card-foreground flex-1 text-center text-sm font-medium">
                    카카오톡 계정으로 로그인
                  </span>
                </button>
                <button
                  className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground bg-card border-border hover:bg-muted/50 inline-flex h-auto w-full max-w-[448px] min-w-[322px] cursor-pointer items-center justify-center gap-2 rounded-full border-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                  type="button"
                >
                  <GoogleIcon />
                  <span className="text-card-foreground flex-1 text-center text-sm font-medium">
                    구글 계정으로 로그인
                  </span>
                </button>
                <button
                  className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground bg-card inline-flex h-auto w-full max-w-[448px] min-w-[322px] cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#1877F2]! px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors hover:bg-[#1877F2]/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                  type="button"
                >
                  <FacebookIcon />
                  <span className="text-card-foreground flex-1 text-center text-sm font-medium">
                    페이스북 계정으로 로그인
                  </span>
                </button>
                <div className="text-muted-foreground mt-4 flex items-center justify-center gap-4 text-sm">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/sign-in')}>
                    이메일로 로그인
                  </Button>
                  <span>|</span>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/sign-up')}>
                    회원가입
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
