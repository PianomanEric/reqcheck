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
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import LoginSignupDialog from '../components/LoginSignupDialog';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const { auth, setAuth, isLoggedIn } = useAuth();

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [showLoginSignupDialog, setShowLoginSignupDialog] = useState(false);
  const [loginSignupDialogPage, setLoginSignupDialogPage] = useState('Login');

  const dropdownHighlighted = useRef(false);
  const searchBar = useRef();

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
        return res.data;
      }
    });
  }

  const getAutofillOptionsFromSearchResults = (results) => {
    return results.map((row) => {
      return row.codeID.replace(/(^[a-zA-Z]+)/g, '$1 ');
    });
  }

  const onChangeSearch = async (e) => {
    console.log("Search changed!");
    setSearchTerms(e.target.value || '');
  }

  const runSearch = async () => {
    const results = await getSearchResults(searchTerms);
    console.log('searching');
    console.log(searchTerms);
    if (results.length == 1) {
      console.log("1 result, redirect to page");
      console.log(results);
      navigate(`/course/${results[0].codeID}`.toLowerCase());
    } else {
      console.log("Multiple results! Redirect to search list");
      navigate(`/course/search?query=${searchTerms}`);
    }
  }

  useEffect(() => {
    let searchChanged = false;
    if (searchTerms !== '') {
      getSearchResults(searchTerms).then((results) => {
        if (!searchChanged) {
          setSearchResults(getAutofillOptionsFromSearchResults(results));
        }
        //}
      });
    } else {
      setSearchResults([]);
    }
    return () => {
      searchChanged = true;
    };
  }, [searchTerms])

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
        <Autocomplete
          onChange={(e, value) => {
            console.log("setting search terms " + e.target.innerText);
            console.log('Selected value');
            console.log(typeof(value));
            console.log(value);
            setSearchTerms(value || '');
          }}
          filterOptions={(x) => x}
          id='free-solo-demo'
          freeSolo
          size='small'
          options={searchResults}
          sx={{
            mx: 1,
            width: '250px',
          }}
          renderInput={(params) =>
            <TextField {...params} inputRef={searchBar} InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={runSearch} edge='start'>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder='Search Courses'
            onChange={onChangeSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value && !dropdownHighlighted.current) {
                console.log("Submit search!");
                runSearch(searchTerms);
                searchBar.current.blur();
              }
            }}
            />
          }
          onHighlightChange={(e, option) => {
            console.log(e);
            console.log(option);
            if (option) {
              dropdownHighlighted.current = true;
            }
          }}
          onClose={(e) => {
            dropdownHighlighted.current = false;
          }}
        />
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