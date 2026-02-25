import type { Chat } from '@/entities/chat';

interface SentBubbleProps {
  chat: Chat;
}

export const SentBubble = ({ chat }: SentBubbleProps) => {
  const timeString = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(chat.timestamp);

  return (
    <div className="flex items-end justify-end gap-2">
      <span className="text-muted-foreground text-xs">{timeString}</span>
      <div className="max-w-[70%] rounded-lg bg-[#6FCA3C] px-3 py-2">
        {chat.contentType === 'image' && <img src={chat.content} alt="이미지" />}
        {chat.contentType === 'text' && <p className="text-sm text-white">{chat.content}</p>}
      </div>
    </div>
  );
};
