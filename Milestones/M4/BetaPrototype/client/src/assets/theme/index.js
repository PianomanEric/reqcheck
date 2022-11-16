import React from 'react';
import createTheme from '@mui/material/styles/createTheme';

export const Colors = {
    primary: "#149BFC",
    primary_dark: "#024baa",
    primary_light: "#90cdfd",
    secondary: "#00c09c",
    secondary_dark: "#009469",
    secondary_light: "#a9e4d4",
    white: "#fff",
    light_gray: "#F6F6F6",
    black: "#000"
}

const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: Colors.light_gray,
        white: Colors.white,
      },
      primary: {
          main: Colors.primary,
          light: Colors.primary_light,
          dark: Colors.primary_dark,
      },
      secondary: {
          main: Colors.secondary,
          light: Colors.secondary_light,
          dark: Colors.secondary_dark,
      },
    },
    typography: {
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            }
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              paddingTop: "8px",
              paddingBottom: "8px",
            }
          }
        },
        MuiLink: {
          styleOverrides: {
            root: {
              textDecoration: "none",
            }
          }
        },
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: Colors.white,
            }
          }
        }
    },
});

export default theme;