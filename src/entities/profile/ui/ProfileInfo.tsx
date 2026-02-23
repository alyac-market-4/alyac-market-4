interface ProfileInfoProps {
  username: string;
  accountname: string;
  intro: string;
}

export const ProfileInfo = ({ username, accountname, intro }: ProfileInfoProps) => {
  return (
    <div className="mt-4 space-y-1 text-center">
      <h2 className="text-foreground text-base font-bold">{username}</h2>
      <p className="text-muted-foreground text-sm">@{accountname}</p>
      <p className="text-foreground text-sm">{intro}</p>
    </div>
  );
};
