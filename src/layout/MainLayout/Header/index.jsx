import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';

// project imports
import LAYOUT_CONST from '@/constant';
import useConfig from '@/hooks/useConfig';
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleDrawerToggle }) => {
  const theme = useTheme();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { layout } = useConfig();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 270,
          mr: 2.5,
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>

        {layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
          <IconButton
            variant="rounded"
            sx={{
              overflow: 'hidden',
              transition: 'all .2s ease-in-out',
              color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light,
              '&:hover': {
                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light,
              },
            }}
            onClick={handleDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="25px" />
          </IconButton>
        ) : null}
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleDrawerToggle: PropTypes.func,
};

export default Header;
