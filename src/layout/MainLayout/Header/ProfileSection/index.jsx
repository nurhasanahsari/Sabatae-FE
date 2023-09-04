import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import Transitions from '@/ui-component/extended/Transitions';
import useAuth from '@/hooks/useAuth';
import AlertDialog from '@/ui-component/extended/AlertDialog';
import greeting from '@/utils/greeting';

// assets
import { IconLogout, IconCaretDown } from '@tabler/icons-react';
import useConfig from '@/hooks/useConfig';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  const matchMobile = useMediaQuery(theme.breakpoints.down('md'));

  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
    navigate('/');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleSetRole = () => {
    if (['01', '02'].includes(user?.role)) {
      setRole('Admin');
    } else {
      setRole('Admin');
    }
  };
  useEffect(() => {
    handleSetRole();
  }, []);

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (['01', '02'].includes(user?.role)) {
      route = '/admin/profile';
    } else {
      route = '/admin/profile';
    }

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <ButtonBase sx={{ p: 1, borderRadius: 50 }} onClick={handleToggle}>
        <Stack direction="row" alignItems="center" spacing={2} width="100%">
          <Avatar alt="photo profile" src={user?.avatar} />
          {!matchMobile && (
            <Stack alignItems="flex-start">
              <Typography variant="h5" color="text.light">
                {user?.name || user?.email || role}
              </Typography>
              {user?.role === '01' && (
                <Typography variant="subtitle2" sx={{ textAlign: 'left' }} color="text.light">
                  Super Admin
                </Typography>
              )}
              {user?.role === '02' && (
                <Typography variant="subtitle2" sx={{ textAlign: 'left' }} color="text.light">
                  Admin
                </Typography>
              )}
            </Stack>
          )}
          <IconCaretDown ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" color="#fff" />
        </Stack>
      </ButtonBase>

      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [-140, 20],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Box sx={{ p: 2, pb: 2 }}>
                      <Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="h5">{greeting()}</Typography>
                          <Typography component="span" variant="h6" sx={{ fontWeight: 400 }}>
                            {user?.name || user?.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 300,
                          minWidth: 250,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%',
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{ borderRadius: `${borderRadius}px` }}
                          selected={selectedIndex === 2}
                          onClick={() => {
                            setOpen(false);
                            setOpenLogout(true);
                          }}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="20px" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Keluar</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>

      <AlertDialog open={openLogout} onClose={() => setOpenLogout(false)} onConfirm={handleLogout} loading={loading}>
        {openLogout && <>Apakah Anda yakin ingin keluar?</>}
      </AlertDialog>
    </>
  );
};

export default ProfileSection;
