// material-ui
import { createTheme } from '@mui/material/styles';

// assets
import defaultColor from 'assets/scss/_themes-vars.module.scss';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (navType) => {
  let colors = defaultColor;

  return createTheme({
    palette: {
      mode: navType,
      common: {
        black: colors.darkPaper,
      },
      primary: {
        main: colors.primaryMain,
        10: colors.primary10,
        20: colors.primary20,
        30: colors.primary30,
        40: colors.primary40,
        50: colors.primary50,
        60: colors.primary60,
        70: colors.primary70,
        80: colors.primary80,
        90: colors.primary90,
        100: colors.primary100,
      },
      secondary: {
        main: colors.secondaryMain,
        10: colors.secondary10,
        20: colors.secondary20,
        30: colors.secondary30,
        40: colors.secondary40,
        50: colors.secondary50,
        60: colors.secondary60,
        70: colors.secondary70,
        80: colors.secondary80,
        90: colors.secondary90,
        100: colors.secondary100,
      },
      error: {
        light: colors.errorLight,
        main: colors.errorMain,
        dark: colors.errorDark,
      },
      orange: {
        light: colors.orangeLight,
        main: colors.orangeMain,
        dark: colors.orangeDark,
      },
      warning: {
        light: colors.warningLight,
        main: colors.warningMain,
        dark: colors.warningDark,
      },
      success: {
        light: colors.successLight,
        200: colors.success200,
        main: colors.successMain,
        dark: colors.successDark,
      },
      grey: {
        50: colors.grey50,
        100: colors.grey100,
        500: colors.grey500,
        600: colors.grey900,
        700: colors.grey700,
        900: colors.grey900,
      },
      dark: {
        light: colors.darkTextPrimary,
        main: colors.darkLevel1,
        dark: colors.darkLevel2,
        800: colors.darkBackground,
        900: colors.darkPaper,
      },
      text: {
        primary: colors.primary80,
        secondary: colors.secondary60,
        dark: colors.primary100,
        hint: colors.grey100,
      },
      divider: colors.grey200,
      background: {
        paper: colors.paper,
        default: colors.background,
      },
    },
  });
};

export default Palette;
