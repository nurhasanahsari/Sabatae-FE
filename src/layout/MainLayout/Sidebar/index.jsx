import { memo, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Stack, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
// import MenuCard from './MenuCard';
import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';
import Chip from '@/ui-component/extended/Chip';

import LAYOUT_CONST from '@/constant';
import useConfig from '@/hooks/useConfig';
import { drawerWidth } from '@/store/constant';

import { useDispatch, useSelector } from '@/store';
import { openDrawer } from '@/store/slices/menu';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const { layout, drawerType } = useConfig();

  const logo = useMemo(
    () => (
      <Box sx={{ display: 'flex', p: 2 }}>
        <LogoSection />
      </Box>
    ),
    []
  );

  const drawerContent = (
    <>
      <MenuList />
      {/* {layout === LAYOUT_CONST.VERTICAL_LAYOUT && drawerOpen && <MenuCard />} */}
      {layout === LAYOUT_CONST.VERTICAL_LAYOUT && drawerOpen && (
        <Stack direction="row" justifyContent="center" sx={{ mb: 2, position: 'absolute', bottom: 20, left: 0, right: 0, margin: 'auto' }}>
          <Chip label={`Sabatae ${import.meta.env.VITE_VERSION}`} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
        </Stack>
      )}
    </>
  );

  const drawerSX = {
    paddingRight: drawerOpen ? '16px' : 0,
    paddingTop: matchUpMd ? '10px' : '15px',
    background: theme.palette.primary.main,
  };

  const drawer = useMemo(
    () => (
      <>
        {matchDownMd ? (
          <Box sx={drawerSX}>{drawerContent}</Box>
        ) : (
          <PerfectScrollbar
            component="div"
            style={{
              height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 75px)',
              ...drawerSX,
            }}
          >
            {drawerContent}
          </PerfectScrollbar>
        )}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchUpMd, drawerOpen, drawerType]
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto', background: theme.palette.grey[100] }}
      aria-label="mailbox folders"
    >
      {matchDownMd || (drawerType === LAYOUT_CONST.MINI_DRAWER && drawerOpen) ? (
        <Drawer
          variant={matchUpMd ? 'persistent' : 'temporary'}
          anchor="left"
          open={drawerOpen}
          onClose={() => dispatch(openDrawer(!drawerOpen))}
          sx={{
            '& .MuiDrawer-paper': {
              mt: matchDownMd ? 0 : 11,
              zIndex: 1099,
              width: drawerWidth,
              background: theme.palette.primary.main,
              color: theme.palette.text.primary,
              borderRight: 'none',
            },
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {matchDownMd && logo}
          {drawer}
        </Drawer>
      ) : (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {matchDownMd && logo}
          {drawer}
        </MiniDrawerStyled>
      )}
    </Box>
  );
};

export default memo(Sidebar);
