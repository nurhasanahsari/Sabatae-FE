// third party
import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRotes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRotes, MainRoutes]);
}
