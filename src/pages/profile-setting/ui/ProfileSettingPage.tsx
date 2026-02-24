import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@/entities/auth';
import { useUserMutation } from '@/entities/user';
import { type ProfileFormData, profileSchema } from '@/features/profile/model/schemas';
import { Button } from '@/shared/ui';

export const ProfileSettingPage = () => {
  const navigate = useNavigate();
  const { signUpMutation } = useAuth();
  const { validateAccountnameMutation } = useUserMutation();

  const location = useLocation();
  const user = location.state?.user;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      accountname: '',
      intro: '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) {
      alert('이전 단계 데이터가 없습니다.'); //TODO 모달로 변경
      navigate('/sign-up');
      return;
    }

    try {
      const response = await validateAccountnameMutation.mutateAsync(data.accountname);
      if (!response.ok) {
        form.setError('accountname', {
          type: 'server',
          message: response.message,
        });
        return;
      }

      const userInfo = {
        ...user,
        ...data,
        image: '',
      };

      await signUpMutation.mutateAsync(userInfo);
      navigate('/sign-in');
    } catch (error) {
      console.error(error);
    }
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

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="space-y-2">
                <label htmlFor="username" className="text-foreground block text-sm font-medium">
                  사용자 이름
                </label>
                <input
                  {...form.register('username')}
                  className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="username"
                  placeholder="이름을 입력하세요."
                  type="text"
                />
                {form.formState.errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="accountname" className="text-foreground block text-sm font-medium">
                  계정 ID
                </label>
                <input
                  {...form.register('accountname')}
                  className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="accountname"
                  placeholder="계정 아이디를 입력하세요."
                  type="text"
                />
                {form.formState.errors.accountname && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.accountname.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="소개" className="text-foreground block text-sm font-medium">
                  소개
                </label>
                <input
                  {...form.register('intro')}
                  className="bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border border-b-2 border-[#6FCA3C] px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-[#6FCA3C] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="소개"
                  placeholder="간단한 자기 소개를 입력하세요."
                  type="text"
                />
                {form.formState.errors.intro && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.intro.message}</p>
                )}
              </div>

              <Button
                variant="alyac"
                size="lgbtn"
                type="submit"
                disabled={!form.formState.isValid || validateAccountnameMutation.isPending}
              >
                {validateAccountnameMutation.isPending ? '처리 중...' : '알약마켓 시작하기'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
