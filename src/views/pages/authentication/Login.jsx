import { useState } from 'react';

// material ui
import { useTheme } from '@mui/system';
import { Grid, Stack, Typography } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import LoginForm from './forms/LoginForm';

// assets
import BackgroundImage from '@/assets/images/pages/authentication/background.jpg';

const Login = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Grid item xs={12} md={5} mx={{ xs: 4, md: 0 }} display="flex" alignItems="center" justifyContent="center">
        <MainCard sx={{ width: '100%', p: { xs: 4, md: 2 } }}>
          <Stack gap={2}>
            <Stack gap={2}>
              <Typography variant="h1" textAlign="center" sx={{ color: theme.palette.primary.main }}>
                Sabatae
              </Typography>
              <Typography variant="h3" textAlign="center">
                Login
              </Typography>
              <LoginForm />
            </Stack>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Login;
