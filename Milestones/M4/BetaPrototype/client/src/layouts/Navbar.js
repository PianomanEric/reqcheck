import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import LoginSignupDialog from '../components/LoginSignupDialog';
import CourseSearchBar from '../components/CourseSearchBar';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const NavButton = (props) => {
  return <Button variant='contained' {...props} sx={{
    mx: 1,
    color: 'common.white',
    flexShrink: 0,
    ...props.sx
  }}/>
}

const CloseButton = (props) => {
  return (
    <IconButton onClick={props.onClick} key="Menu" sx={{
      display: "flex",
      alignItems: "center",
      p: 1,
    }}>
      <CloseIcon />
    </IconButton>
  )
}

const MenuButton = (props) => {
  return (
    <IconButton onClick={props.onClick} key="Menu" {...props} sx={{
      display: "flex",
      alignItems: "center",
      height: '40px',
      ...props.sx,
    }}>
      <MenuIcon />
    </IconButton>
  )
}

export default function Navbar() {

  const { auth, setAuth, logout, isLoggedIn } = useAuth();

  const [showLoginSignupDialog, setShowLoginSignupDialog] = useState(false);
  const [loginSignupDialogPage, setLoginSignupDialogPage] = useState('Login');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
  }

  const handleShowLogin = () => {
    setShowLoginSignupDialog(true);
    setLoginSignupDialogPage('Login');
  }
  
  const handleShowSignup = () => {
    setShowLoginSignupDialog(true);
    setLoginSignupDialogPage('Signup');
  }

  const handleCloseLoginSignup = () => {
    setShowLoginSignupDialog(false);
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <AppBar position='sticky' elevation={3} sx={{
      p: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: {
            xs: '100%',
            sm: 'auto',
          }
        }}>
          <MenuButton onClick={handleDrawerToggle} sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}/>
          <Link component={RouterLink} to='/'>
            <Typography component='div' variant='h5' align='center' color='initial' sx={{
              px: 2,
              fontWeight: '700',
              color: 'primary.main',
              textStroke: '1px black',
              display: 'flex',
              alignItems: 'center',
            }}>
              <CheckIcon fontSize='medium' sx={{
                p: 0,
                display: 'inline',
                stroke: '#0c0',
                strokeWidth: 1.5,
                fill: '#0c0',
              }} />
              ReqCheck
            </Typography>
          </Link>
        </Box>
        <Box sx={{
          display: {
            xs: 'none',
            sm: 'flex',
          },
          flexDirection: 'row',
          alignItems: 'center',
          flexGrow: 0,
        }}>
          <Link component={RouterLink} to='/'>
            <Typography variant='body1' align='center' color='initial' sx={{
              px: 2,
              py: 1,
            }}>
              Home
            </Typography>
          </Link>
          <Link component={RouterLink} to='/about'>
            <Typography variant='body1' align='center' color='initial' sx={{
              px: 2,
              py: 1,
            }}>
              About Us
            </Typography>
          </Link>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexGrow: {
            xs: 0,
            sm: 1,
          }
        }}>
          <CourseSearchBar sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            flexGrow: 1,
          }}/>

          {
          !isLoggedIn() ? <>
            <NavButton onClick={handleShowSignup}>
              Register
            </NavButton>
            <NavButton onClick={handleShowLogin}>
              Login
            </NavButton>
          </> : <>
            <Typography sx={{mx: 1}}>
              {'Logged in as ' + auth.firstname + ' ' + auth.lastname}
            </Typography>
            <NavButton onClick={handleLogout}>
              Sign Out
            </NavButton>
          </>
          }

        </Box>
        <LoginSignupDialog open={showLoginSignupDialog} page={loginSignupDialogPage} onPageChange={setLoginSignupDialogPage} onClose={handleCloseLoginSignup}></LoginSignupDialog>
      </Box>
      
      <CourseSearchBar sx={{
        display: {
          xs: 'block',
          md: 'none',
        },
        p: 1,
        pt: 1.5,
        flexGrow: 1,
      }}/>
      <Drawer variant="temporary" open={drawerOpen} onClose={handleDrawerToggle} PaperProps={{onClick: handleCloseDrawer}} sx={{
        display: {
          xs: "flex",
          sm: "none",
        },
        flexDirection: "column",
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row-reverse",
          width: "250px",
          p: 1,
        }}>
          <CloseButton onClose={handleDrawerToggle} />
        </Box>
        <List sx={{
          flexGrow: 1,
        }}>
          <Link component={RouterLink} to='/'>
            <Typography variant='body1' color='initial' sx={{
              px: 3,
              py: 1,
            }}>
              Home
            </Typography>
          </Link>
          <Link component={RouterLink} to='/about'>
            <Typography variant='body1' color='initial' sx={{
              px: 3,
              py: 1,
            }}>
              About Us
            </Typography>
          </Link>
        </List>
      </Drawer>

    </AppBar>
    
  );
}