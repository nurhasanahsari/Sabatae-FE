import { lazy } from 'react';

// project imports
import Loadable from '@/ui-component/Loadable';
import MinimalLayout from '@/layout/MinimalLayout';

// maintenance routing
const MaintenanceError = Loadable(lazy(() => import('@/views/pages/error/NotFound')));
const MaintenanceForbidden = Loadable(lazy(() => import('@/views/pages/error/Forbidden')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const ErrorRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/forbidden',
            element: <MaintenanceForbidden />
        },
        {
            path: '*',
            element: <MaintenanceError />
        }
    ]
};

export default ErrorRoutes;
