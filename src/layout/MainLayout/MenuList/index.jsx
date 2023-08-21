import { memo, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';

// project imports
import useAuth from '@/hooks/useAuth';
import menuItem from '@/menu-items';
import NavGroup from './NavGroup';
import LAYOUT_CONST from '@/constant';
import { HORIZONTAL_MAX_ITEM } from '@/config';
import useConfig from '@/hooks/useConfig';
// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { layout } = useConfig();
  const [menu, setMenu] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (['01'].includes(user?.role)) {
      setMenu(menuItem.superAdmin);
    } else if (user?.role === '02') {
      setMenu(menuItem.admin);
    } else {
      setMenu(menuItem.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // last menu-item to show in horizontal menu bar
  const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

  let lastItemIndex = menu.length - 1;
  let remItems = [];
  let lastItemId;

  if (lastItem && lastItem < menu.length) {
    lastItemId = menu[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menu.slice(lastItem - 1, menu.length).map((item) => ({
      title: item.title,
      elements: item.children,
    }));
  }

  const navItems =
    menu &&
    menu.slice(0, lastItemIndex + 1).map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });

  return <>{navItems}</>;
};

export default memo(MenuList);
