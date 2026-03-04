import { cn } from '@/shared/lib';

type Props = {
  /** 페이지 단위 로딩이면 true (기본값). 작은 영역 로딩이면 false */
  full?: boolean;
  className?: string;
  text?: string;
};

export const LoadingState = ({ full = true, className, text = '로딩중...' }: Props) => {
  return (
    <div
      className={cn(
        full ? 'flex min-h-[70vh] items-center justify-center' : 'inline-flex items-center',
        className,
      )}
    >
      <p className="text-sm opacity-70">{text}</p>
    </div>
  );
};
