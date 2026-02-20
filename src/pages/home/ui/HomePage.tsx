import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7117 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92176 4.44061 8.37485 5.27072 7.03255C6.10083 5.69025 7.28825 4.60557 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99476 18.5291 5.47086C20.0052 6.94695 20.885 8.91565 21 11V11.5Z"
                      fill="#F2C94C"
                    ></path>
                  </svg>
                  <span className="text-card-foreground flex-1 text-center text-sm font-medium">
                    카카오톡 계정으로 로그인
                  </span>
                </button>
                <button
                  className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground bg-card border-border hover:bg-muted/50 inline-flex h-auto w-full max-w-[448px] min-w-[322px] cursor-pointer items-center justify-center gap-2 rounded-full border-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                  type="button"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.9999 12.2069C20.9999 11.6015 20.9463 11.0268 20.8543 10.4674H12.1953V13.9234H17.1532C16.9309 15.0575 16.2796 16.0153 15.3141 16.6667V18.9655H18.2719C20.0037 17.364 20.9999 15.0038 20.9999 12.2069Z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M12.1954 21.1954C14.6782 21.1954 16.7548 20.3678 18.272 18.9655L15.3142 16.6667C14.4866 17.2184 13.4368 17.5556 12.1954 17.5556C9.79695 17.5556 7.7663 15.9387 7.03833 13.7548H3.98853V16.1226C5.4981 19.1265 8.60155 21.1954 12.1954 21.1954Z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M7.03831 13.7548C6.84674 13.203 6.74712 12.613 6.74712 12C6.74712 11.387 6.8544 10.7969 7.03831 10.2452V7.87738H3.9885C3.36015 9.11876 3 10.5134 3 12C3 13.4866 3.36015 14.8812 3.9885 16.1226L7.03831 13.7548Z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M12.1954 6.44444C13.5517 6.44444 14.7625 6.91188 15.7203 7.82375L18.341 5.20306C16.7548 3.71647 14.6782 2.8046 12.1954 2.8046C8.60155 2.8046 5.4981 4.87356 3.98853 7.87739L7.03833 10.2452C7.7663 8.0613 9.79695 6.44444 12.1954 6.44444Z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  <span className="text-card-foreground flex-1 text-center text-sm font-medium">
                    구글 계정으로 로그인
                  </span>
                </button>
                <button
                  className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground bg-card inline-flex h-auto w-full max-w-[448px] min-w-[322px] cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#1877F2]! px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors hover:bg-[#1877F2]/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                  type="button"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"
                      fill="#2D9CDB"
                    ></path>
                  </svg>
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
