import {
  AppBar,
  Box,
  Button,
  Link,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import LoginSignupDialog from '../components/LoginSignupDialog';
import CourseSearchBar from '../components/CourseSearchBar';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import CheckIcon from '@mui/icons-material/Check';

export default function Navbar() {

  const { auth, setAuth, logout, isLoggedIn } = useAuth();

  const [showLoginSignupDialog, setShowLoginSignupDialog] = useState(false);
  const [loginSignupDialogPage, setLoginSignupDialogPage] = useState('Login');



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

  return (
    <AppBar position='sticky' elevation={3} sx={{
      p: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
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
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
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

      }}>
        <CourseSearchBar/>
        {
          !isLoggedIn() ? <>
            <Button variant='contained' onClick={handleShowSignup} sx={{
              mx: 1,
              color: 'common.white',
            }}>
              Register
            </Button>
            <Button variant='contained' onClick={handleShowLogin} sx={{
              mx: 1,
              color: 'common.white',
            }}>
              Login
            </Button>
          </> : <>
            <Typography sx={{mx: 1}}>
              {'Logged in as ' + auth.firstname + ' ' + auth.lastname}
            </Typography>
            <Button variant='contained' onClick={handleLogout} sx={{
              mx: 1,
              color: 'common.white',
            }}>
              Sign Out
            </Button>
          </>
        }
      </Box>
      <LoginSignupDialog open={showLoginSignupDialog} page={loginSignupDialogPage} onPageChange={setLoginSignupDialogPage} onClose={handleCloseLoginSignup}></LoginSignupDialog>
    </AppBar> 
  );
}