import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

// project imports
import useAuth from '@/hooks/useAuth';
import { DASHBOARD_SUPER_ADMIN_PATH, DASHBOARD_ADMIN_PATH } from '@/config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const { user } = useAuth();
  return (
    <Link
      component={RouterLink}
      to={user?.role === '01' ? DASHBOARD_SUPER_ADMIN_PATH : DASHBOARD_ADMIN_PATH}
      aria-label="theme-logo"
      sx={{ textDecoration: 'none' }}
    >
      <Stack direction="row" alignItems="center">
        <Typography variant="h1" color="text.light">
          Sabatae
        </Typography>
      </Stack>
    </Link>
  );
};

export default LogoSection;
