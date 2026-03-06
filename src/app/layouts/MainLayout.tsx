import { Outlet } from 'react-router-dom';

import { Nav } from '@/widgets/nav';

export const MainLayout = () => {
  return (
    <>
      <div className="flex-1">
        <Outlet />
      </div>
      <Nav />
    </>
  );
};
