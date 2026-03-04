import { Spinner } from './spinner';

export const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="text-primary size-16" />
    </div>
  );
};
