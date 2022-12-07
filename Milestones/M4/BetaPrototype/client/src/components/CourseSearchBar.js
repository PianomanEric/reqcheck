import {
    Autocomplete,
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Course() {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [searchTerms, setSearchTerms] = useState('');

    const dropdownHighlighted = useRef(false);
    const searchBar = useRef();
  
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
    );
}