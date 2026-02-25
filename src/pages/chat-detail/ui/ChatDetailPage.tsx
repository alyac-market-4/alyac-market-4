import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { type Chat, ReceivedBubble, SentBubble } from '@/entities/chat';
import { fullLogoAlyac } from '@/shared/assets';
import { themeIcons, useTheme } from '@/shared/lib';
import {
  BackButton,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  KebabMenu,
  ProfileAvatar,
} from '@/shared/ui';
import { Header } from '@/widgets/header';

const CHAT_DETAIL_LIST: Chat[] = [
  {
    id: 1,
    content:
      '지능형 사이버 위험에 가장 실효적으로 대응할 수 있는 당일의 기업의 안상코드 위험 대응 솔루션인 것는지 공급하여 연락드렸습니다.',
    timestamp: new Date(2026, 1, 25, 12, 39),
    contentType: 'text',
    type: 'received',
  },
  {
    id: 2,
    content: '시간낼 때 확인 후에 답변부탁세요.',
    timestamp: new Date(2026, 1, 25, 12, 41),
    contentType: 'text',
    type: 'received',
  },
  {
    id: 3,
    content: 'Treat Inside 입니다.',
    timestamp: new Date(2026, 1, 25, 12, 50),
    contentType: 'text',
    type: 'sent',
  },
  {
    id: 4,
    content: fullLogoAlyac,
    timestamp: new Date(2026, 1, 25, 12, 51),
    contentType: 'image',
    type: 'sent',
  },
];

export function ChatDetailPage() {
  const { chatId } = useParams();
  const [comment, setComment] = useState<string>('');
  const { theme, switchTheme } = useTheme();

  const handleCommentSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
    setComment('');
  };

  return (
    <>
      <Header
        left={<BackButton />}
        center={`채팅방 ${chatId}`}
        right={
          <KebabMenu
            items={[{ label: '테마:', icon: themeIcons[theme], onClick: () => switchTheme() }]}
          />
        }
      />

      <main className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {CHAT_DETAIL_LIST.map((chat) => {
            if (chat.type === 'received') {
              return <ReceivedBubble key={chat.id} chat={chat} />;
            }
            return <SentBubble key={chat.id} chat={chat} />;
          })}
        </div>
      </main>

      <div className="border-border bg-background sticky right-0 bottom-0 left-0 border-t px-4 py-3">
        <form className="flex items-center gap-3" onSubmit={handleCommentSubmit}>
          <ProfileAvatar alt="프로필 이미지" size="default" />
          <div className="relative flex-1">
            <InputGroup variant="default">
              <InputGroupInput
                placeholder="메시지 입력하기..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <Button variant="ghost" type="submit" className="font-semibold">
                  전송
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </form>
      </div>
    </>
  );
}
