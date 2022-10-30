import React from 'react';
import createTheme from '@mui/material/styles/createTheme';
import { Link } from 'react-router-dom';

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  if (props.to !== undefined && (props.to.length === 0 || props.to.charAt(0) === '#' || props.to.charAt(0) === '/')) {
    return <Link ref={ref} to={href} {...other} />;
  } else {
    let editedProps = {...other};
    delete editedProps.to;
    return <a ref={ref} href={other.to} target="_blank" {...editedProps}  />;
  }
}); 

export const Colors = {
    primary: "#6273b3",
    primary_dark: "#41529d",
    primary_light: "#a2add3",
    secondary: "#edd035",
    secondary_dark: "#c9a92b",
    secondary_light: "#f5de71",
    white: "#fff",
    black: "#000"
}

const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: Colors.white,
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
        MuiLink: {
          defaultProps: {
            component: LinkBehavior,
          },
          styleOverrides: {
            root: {
              textDecoration: "none",
            } 
          }
        },
        MuiButtonBase: {
          defaultProps: {
            LinkComponent: LinkBehavior,
          },
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