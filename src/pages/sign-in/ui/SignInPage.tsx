import { AuthLinks } from '@/features/auth';
import { SignInForm } from '@/widgets/auth';

export const SignInPage = () => {
  return (
    <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold">로그인</h1>
        </div>
        <SignInForm />
        <AuthLinks mode="signin" />
      </div>
    </div>
  );
};
