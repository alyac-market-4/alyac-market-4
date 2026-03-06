import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

interface FollowStatProps {
  label: string;
  count: number;
  link: string;
}

export const FollowStat = ({ label, count, link }: FollowStatProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(link)}
      variant="ghost"
      className="flex h-auto w-auto flex-col gap-0"
    >
      <span className="text-foreground text-xl font-bold">{count}</span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </Button>
  );
};
