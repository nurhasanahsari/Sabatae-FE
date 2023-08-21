import { lazy } from 'react';

// project imports
import GuestGuard from '@/utils/route-guard/GuestGuard';
import MinimalLayout from '@/layout/MinimalLayout';
import NavMotion from '@/layout/NavMotion';
import Loadable from '@/ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('@/views/pages/authentication/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: (
    <NavMotion>
      <GuestGuard>
        <MinimalLayout />
      </GuestGuard>
    </NavMotion>
  ),
  children: [
    {
      path: '/',
      element: <AuthLogin />,
    },
    {
      path: '/login',
      element: <AuthLogin />,
    },
  ],
};

export default AuthenticationRoutes;
