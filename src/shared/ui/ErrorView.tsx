import { Button } from './button';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export const ErrorView = ({ message, onRetry }: ErrorViewProps) => (
  <div className="py-4 text-center">
    <p className="flex flex-col items-center gap-2 text-sm text-red-500">에러 발생: {message}</p>
    <Button onClick={onRetry} size="sm">
      재시도
    </Button>
  </div>
);
