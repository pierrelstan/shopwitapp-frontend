import { createMuiTheme } from '@material-ui/core/styles';

import { orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      sm30: 630,
      sm80: 800,
      md: 960,
      md1030: 1030,
      lg: 1280,
      xl: 1920,
    },
  },
  status: {
    danger: orange[500],
  },
  secondaryColor: {
    danger: '#b98152',
  },
});
