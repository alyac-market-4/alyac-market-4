import { Link } from 'react-router-dom';

interface ChatSummaryProps {
  profileAvatar: React.ReactNode;
  username: string;
  chatContent: string;
  timestamp: string;
  to: string;
}

export const ChatSummary = (props: ChatSummaryProps) => {
  const { profileAvatar, username, chatContent, timestamp, to } = props;

  return (
    <Link
      className="ring-offset-background focus-visible:ring-ring hover:text-accent-foreground border-border hover:bg-muted/50 inline-flex h-auto w-full cursor-pointer items-center justify-start gap-3 rounded-none border-b px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
      type="button"
      to={to}
    >
      {profileAvatar}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <div className="flex w-full items-center justify-between">
          <span className="text-foreground text-sm font-semibold">{username}</span>
          <span className="text-muted-foreground shrink-0 text-xs">{timestamp}</span>
        </div>
        <p className="text-muted-foreground w-full truncate text-left text-sm">{chatContent}</p>
      </div>
    </Link>
  );
};
