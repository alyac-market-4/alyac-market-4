import { Outlet } from 'react-router-dom';

import { SuspenseWrapper } from '@/shared/ui';
import { Nav } from '@/widgets/nav/ui/Nav';

export const MainLayout = () => {
  return (
    <>
      <div className="flex-1">
        <SuspenseWrapper>
          <Outlet />
        </SuspenseWrapper>
      </div>
      <Nav />
    </>
  );
};
