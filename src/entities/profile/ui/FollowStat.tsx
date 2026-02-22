interface FollowStatProps {
  label: string;
  count: number;
}

export const FollowStat = ({ label, count }: FollowStatProps) => {
  return (
    <div className="hover:text-primary flex cursor-pointer flex-col items-center">
      <span className="text-foreground text-xl font-bold">{count}</span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  );
};
