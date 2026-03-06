import { Outlet, ScrollRestoration } from 'react-router-dom';

export const ScrollManager = () => {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
