import { SignUpForm } from '@/widgets/auth';

export const SignUpPage = () => {
  return (
    <div className="bg-background flex min-h-screen justify-center px-4 pt-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold">이메일로 회원가입</h1>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};
