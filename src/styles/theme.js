import {createTheme} from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#ff5722',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {

            color: '#000000',
            textDecoration: 'none'

      }
    }
  }
});
