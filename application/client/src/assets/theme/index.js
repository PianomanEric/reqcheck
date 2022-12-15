import createTheme from '@mui/material/styles/createTheme';

export const Colors = {
    primary: '#149BFC',
    primary_dark: '#024baa',
    primary_light: '#90cdfd',
    secondary: '#00c09c',
    secondary_dark: '#009469',
    secondary_light: '#a9e4d4',
    white: '#fff',
    lighter_gray: '#f8f9f8',
    light_gray: '#F6F6F6',
    gray: '#718299',
    dark_gray: '#1e1e1e',
    black: '#000'
}

const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: Colors.light_gray,
        light: Colors.lighter_gray,
        white: Colors.white,
        dark: Colors.dark_gray,
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
    /*
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
      '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
      '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
      '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
      '0px 2px 4px -1px rgba(0,0,0,0.1),0px 5px 6px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
    ],
    */
    components: {
        MuiButton: {
            defaultProps: {
                //disableRipple: true,
                disableElevation: true,
            }
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              paddingTop: '8px',
              paddingBottom: '8px',
            }
          }
        },
        MuiLink: {
          styleOverrides: {
            root: {
              textDecoration: 'none',
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