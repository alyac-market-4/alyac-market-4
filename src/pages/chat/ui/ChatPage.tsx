import { EllipsisVertical } from 'lucide-react';

import { ChatSummary } from '@/entities/chat';
import { ProfileAvatar } from '@/shared/ui';
import { BackButton } from '@/shared/ui/BackButton';
import { IconButton } from '@/shared/ui/IconButton';
import { Header } from '@/widgets/header';

const CHAT_LIST = [
  {
    profileAvatar: <ProfileAvatar alt="프로필 이미지1" size="lg" hasBadge />,
    accountname: 'estsecurity',
    username: '이스트 시큐리티',
    chatContent: '안녕! 좋아!',
    timestamp: '2020.10.25',
    to: `/chat/1`,
  },
  {
    profileAvatar: <ProfileAvatar alt="프로필 이미지2" size="lg" hasBadge />,
    accountname: 'estsoft',
    username: '이스트 소프트',
    chatContent: '공급한 곳이 있어 안배드릴겁니다. 이미에 있...',
    timestamp: '2020.10.25',
    to: `/chat/2`,
  },
  {
    profileAvatar: <ProfileAvatar alt="프로필 이미지3" size="lg" />,
    accountname: 'antivirusseller',
    username: '보안 백신 판매가',
    chatContent: '오늘 시간있나요? 아침에 것이 입니다. 이...',
    timestamp: '2020.10.02',
    to: `/chat/3`,
  },
];

export const ChatPage = () => {
  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <IconButton>
            <EllipsisVertical />
          </IconButton>
        }
      />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-col">
          {CHAT_LIST.map((chat) => {
            return (
              <ChatSummary
                key={chat.accountname}
                profileAvatar={chat.profileAvatar}
                username={chat.username}
                chatContent={chat.chatContent}
                timestamp={chat.timestamp}
                to={chat.to}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};
