import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  InputAdornment,
  Typography,
  Autocomplete,
  TableRow
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginSignupDialog from '../components/LoginSignupDialog';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import CheckIcon from '@mui/icons-material/Check';

// This is hard-coded for now, but we can use the backend to grab our filters later
// Not sure what things we should include in the dropdown filter
// Feel free to change these
const filters = [
  'Courses',
  'Instructors',
  'Degrees'
];

export default function Navbar() {

  const { auth, setAuth } = useAuth();

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [showLoginSignupDialog, setShowLoginSignupDialog] = useState(false);
  const [loginSignupDialogPage, setLoginSignupDialogPage] = useState('Login');

  const handleLogout = () => {
    setAuth();
    document.cookie = "";
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

  const getSearchResults = async (query) => {
    const encodedQuery = encodeURIComponent(query);
    return await axios.get(`/api/courses/search?query=${encodedQuery}`).then((res) => {
      if (res.data) {
        const results = res.data.map((row) => row.title);
        console.log(results);
        return results;
      }
    });
  }

  /*
  useEffect(() => {
    async function fetchSearchData() {
      try {
        const response = await axios.get('/api/courses');
        const title = response.data.map((item) => item.title);
        setTitles([...new Set(title)]);
        setShowTitles(titles);
      } catch(error) {
        console.log(error);
      }
    }
    fetchSearchData();
  }, []);
  */

  const onChangeSearch = async (e) => {
    setSearchTerms(e.target.value);
    console.log("Set the search term to " + e.target.value);
  }

  useEffect(() => {
    if (searchTerms !== '') {
      const termsBeingSearched = searchTerms;
      getSearchResults(termsBeingSearched).then((results) => {
        console.log("After calling, result is");
        console.log(results);
        console.log(searchTerms + ' ' + termsBeingSearched);
        if (searchTerms == termsBeingSearched) {
          setSearchResults(results);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerms]);

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
        {console.log(searchResults)}
        {/* <TextField placeholder={'Search Courses'}
        onChange={(e) => onChangeSearch(e)}
        sx={{
          width: '200px',
          // bgcolor: 'common.white',
          // padding: 1,
          // border: '1px solid #aaa',
        }}/> */}
        <Autocomplete
          id='free-solo-demo'
          freeSolo
          size='small'
          options={searchResults}
          sx={{
            mx: 1,
            width: '250px',
          }}
          renderInput={(params) =>
            <TextField {...params} InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='start'>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              ),
            }} onChange={onChangeSearch} placeholder='Search Courses'/>
          }
        />
        {
          !auth?.username ? <>
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
              {auth.username}
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