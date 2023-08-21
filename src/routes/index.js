// third party
import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRotes from './AuthenticationRoutes';
import ErrorRoutes from './ErrorRoutes';
import { SuperAdminRoutes, AdminRoutes } from './MainRoutes';

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRotes, ErrorRoutes, SuperAdminRoutes, AdminRoutes]);
}
