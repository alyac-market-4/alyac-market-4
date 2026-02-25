import { Link } from 'react-router-dom';

interface FollowStatProps {
  label: string;
  count: number;
  link: string;
}

export const FollowStat = ({ label, count, link }: FollowStatProps) => {
  return (
    <Link to={link} className="hover:text-primary flex flex-col items-center">
      <span className="text-foreground text-xl font-bold">{count}</span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </Link>
  );
};
