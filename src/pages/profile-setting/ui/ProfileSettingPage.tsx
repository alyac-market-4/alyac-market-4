import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { Button } from '@/shared/ui';

export const ProfileSettingPage = () => {
  const navigate = useNavigate();
  const { signInMutation } = useAuth();

  const onClick = () => {
    // TODO: 임시 로그인
    signInMutation.mutate({ user: { email: 'test@test.com', password: '11111111' } });
    navigate('/feed');
  };

  return (
    <div>
      <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-foreground mb-2 text-3xl font-bold">프로필 설정</h1>
            <p className="text-muted-foreground text-sm">나중에 언제든지 변경할 수 있습니다.</p>
          </div>
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <button
                  className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground focus:ring-ring bg-muted hover:bg-muted/80 relative flex h-32 w-32 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full p-0 text-sm font-medium whitespace-nowrap transition-all focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
                  type="button"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 40 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="h-20 w-10"
                  >
                    <path d="M0 0H40V72H0V0Z" fill="url(#pattern0_124226_1030)"></path>
                    <defs>
                      <pattern
                        id="pattern0_124226_1030"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xmlnsXlink="#image0_124226_1030"
                          transform="matrix(0.00215581 0 0 0.00125558 -0.603774 -0.148352)"
                        ></use>
                      </pattern>
                      <image
                        id="image0_124226_1030"
                        width="1024"
                        height="1024"
                        preserveAspectRatio="none"
                      />
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
            <form className="flex flex-col gap-6">
              <div className="space-y-2">
                <label htmlFor="사용자-이름" className="text-foreground block text-sm font-medium">
                  사용자 이름
                </label>
                <input
                  className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="사용자-이름"
                  placeholder="이름을 입력하세요."
                  type="text"
                  name="username"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="계정-id" className="text-foreground block text-sm font-medium">
                  계정 ID
                </label>
                <input
                  className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="계정-id"
                  placeholder="계정 아이디를 입력하세요."
                  type="text"
                  name="accountId"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="소개" className="text-foreground block text-sm font-medium">
                  소개
                </label>
                <input
                  className="bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border border-b-2 border-[#6FCA3C] px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-[#6FCA3C] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="소개"
                  placeholder="간단한 자기 소개를 입력하세요."
                  type="text"
                  name="bio"
                />
              </div>
              <Button variant="alyac" size="lgbtn" onClick={onClick} type="submit">
                알약마켓 시작하기
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
