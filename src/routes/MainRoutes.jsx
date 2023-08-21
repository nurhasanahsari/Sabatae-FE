import { lazy } from 'react';

// project imports
import AuthGuard from '@/utils/route-guard/AuthGuard';
import SuperAdminGuard from '@/utils/route-guard/SuperAdminGuard';
import AdminGuard from '@/utils/route-guard/AdminGuard';
import MainLayout from '@/layout/MainLayout';
import Loadable from '@/ui-component/Loadable';

// dev routing
const Dashboard = Loadable(lazy(() => import('@/views/main/Dashboard')));
const UserManagement = Loadable(lazy(() => import('@/views/main/UserManagement')));
const Inventory = Loadable(lazy(() => import('@/views/main/Inventory')));
const Category = Loadable(lazy(() => import('@/views/main/Category')));
const Purchase = Loadable(lazy(() => import('@/views/main/Purchase')));
const Sale = Loadable(lazy(() => import('@/views/main/Sale')));
const Retur = Loadable(lazy(() => import('@/views/main/Retur')));
const Report = Loadable(lazy(() => import('@/views/main/Report')));

// ==============================|| AUTH ROUTING ||============================== //

// super admin routes
export const SuperAdminRoutes = {
  path: '/super-admin',
  element: (
    <AuthGuard>
      <SuperAdminGuard>
        <MainLayout />
      </SuperAdminGuard>
    </AuthGuard>
  ),
  children: [
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
    {
      path: 'user-management',
      element: <UserManagement />,
    },
    {
      path: 'inventory',
      element: <Inventory />,
    },
    {
      path: 'purchase',
      element: <Purchase />,
    },
    {
      path: 'category',
      element: <Category />,
    },
    {
      path: 'sale',
      element: <Sale />,
    },
    {
      path: 'retur',
      element: <Retur />,
    },
    {
      path: 'report',
      element: <Report />,
    },
  ],
};

// super admin routes
export const AdminRoutes = {
  path: '/admin',
  element: (
    <AuthGuard>
      <AdminGuard>
        <MainLayout />
      </AdminGuard>
    </AuthGuard>
  ),
  children: [
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
    {
      path: 'inventory',
      element: <Inventory />,
    },
    {
      path: 'purchase',
      element: <Purchase />,
    },
    {
      path: 'category',
      element: <Category />,
    },
    {
      path: 'sale',
      element: <Sale />,
    },
    {
      path: 'retur',
      element: <Retur />,
    },
    {
      path: 'report',
      element: <Report />,
    },
  ],
};
