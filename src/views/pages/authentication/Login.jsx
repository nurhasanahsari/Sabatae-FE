// material ui
import { useTheme } from '@mui/system';
import { Grid, Box, Stack, Typography } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import LoginForm from './forms/LoginForm';

// assets
import BackgroundImage from '@/assets/images/pages/authentication/background.jpg';

const Login = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: 'brightness(80%)',
        }}
      />
      <Grid
        container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 99,
        }}
      >
        <Grid item xs={12} md={5} mx={{ xs: 4, md: 0 }} display="flex" alignItems="center" justifyContent="center">
          <MainCard sx={{ width: '100%', p: { borderRadius: 50, xs: 4, md: 2, boxShadow: '0px -1px 91px -5px rgba(0,0,0,0.55)' } }}>
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
    </>
  );
};

export default Login;
