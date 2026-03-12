import { useNavigate } from 'react-router-dom';

import { Button, Spinner } from '@/shared/ui';

interface FollowStatProps {
  label: string;
  count: number;
  link: string;
  isFetching: boolean;
}

export const FollowStat = ({ label, count, link, isFetching }: FollowStatProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(link)}
      variant="ghost"
      disabled={isFetching}
      className="flex h-auto w-auto flex-col gap-0"
    >
      <span className="text-foreground text-xl font-bold">
        {isFetching ? <Spinner className="size-4" /> : count}
      </span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </Button>
  );
};
