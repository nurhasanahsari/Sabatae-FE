import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from '@/config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo" sx={{ textDecoration: 'none' }}>
    <Stack direction="row" alignItems="center">
      <Typography variant="h1" color="text.light">
        Sabatae
      </Typography>
    </Stack>
  </Link>
);

export default LogoSection;
