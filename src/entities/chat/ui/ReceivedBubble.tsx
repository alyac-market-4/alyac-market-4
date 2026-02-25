import type { Chat } from '@/entities/chat';

interface ReceivedBubbleProps {
  chat: Chat;
}

export const ReceivedBubble = ({ chat }: ReceivedBubbleProps) => {
  const timeString = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(chat.timestamp);

  return (
    <div className="flex items-start gap-2">
      <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full"></div>
      <div className="flex flex-col gap-1">
        <div className="bg-muted max-w-[70%] rounded-lg px-3 py-2">
          {chat.contentType === 'image' && <img src={chat.content} alt="이미지" />}
          {chat.contentType === 'text' && <p className="text-sm">{chat.content}</p>}
        </div>
        <span className="text-muted-foreground text-xs">{timeString}</span>
      </div>
    </div>
  );
};
