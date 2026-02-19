import { House, MessageCircle, SquarePlus, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { NavItem } from './NavItem';

export const Nav = () => {
  const pathname = useLocation().pathname;

  return (
    <nav className="bg-background sticky right-0 bottom-0 left-0 border-t">
      <div className="flex items-center justify-around py-2">
        <NavItem to="/feed" icon={<House />} label="홈" isActive={pathname === '/feed'} />
        <NavItem to="/chat" icon={<MessageCircle />} label="채팅" isActive={pathname === '/chat'} />
        <NavItem
          to="/post-create"
          icon={<SquarePlus />}
          label="게시물 작성"
          isActive={pathname === '/post-create'}
        />
        <NavItem to="/profile" icon={<User />} label="프로필" isActive={pathname === '/profile'} />
      </div>
    </nav>
  );
};
