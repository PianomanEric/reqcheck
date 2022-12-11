import {
    Autocomplete,
    Box,
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodeCourseID } from '../util/FormatData';

export default function Course() {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [searchTerms, setSearchTerms] = useState('');
    const searchOnInputChange = useRef(false);
    const optionHighlighted = useRef(false);

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
        const courseName = decodeCourseID(row.codeID);
        return {
          fullName: `${courseName} - ${row.title}`,
          label: courseName,
        };
      });
    }
  
    const onChangeSearch = async (e) => {
      console.log("Search changed!");
      setSearchTerms(e.target.value || '');
    }
  
    const updateOptions = async (value) => {
      getSearchResults(value).then((results) => {
        setSearchResults(getAutofillOptionsFromSearchResults(results));
    });
    }
  
    const runSearch = async (value) => {
      searchBar.current.blur();
      value = value || searchTerms;
      const results = await getSearchResults(value);
      console.log('searching');
      console.log(searchTerms);
      if (results.length == 1) {
        console.log("1 result, redirect to page");
        console.log(results);
        navigate(`/course/${results[0].codeID}`.toLowerCase());
      } else {
        console.log("Multiple results! Redirect to search list");
        navigate(`/course/search?query=${value}`);
      }
    }

    useEffect(() => {
      updateOptions(searchTerms);
    }, [searchTerms])
    
    /*
    useEffect(() => {
        let searchChanged = false;
        if (searchTerms !== '') {
            getSearchResults(searchTerms).then((results) => {
                if (!searchChanged) {
                    setSearchResults(getAutofillOptionsFromSearchResults(results));
                }
            });
        } else {
            setSearchResults([]);
        }
        return () => {
            searchChanged = true;
        };
    }, [searchTerms])
    */

    return (
        <Autocomplete
          filterOptions={(x) => x}
          freeSolo
          selectOnFocus
          clearOnBlur
          size='small'
          options={searchResults}
          value={searchTerms}
          //inputValue={autocompleteInputValue}
          sx={{
            mx: 1,
            width: '250px',
          }}
          renderOption={(props, option) => {
            console.log(option);
            return <Box {...props}>
              {option.fullName}
            </Box>
          }}
          /*
          getOptionLabel={
            (option) => {
              console.log(option);
              return option.id || '';
            }
          }
          */
          onChange={
            (e, value, reason) => {

              console.log("OnChange", value, reason);
              setSearchTerms(value?.label || '');
              //setSearchResults([]);
              if (reason === 'selectOption') {
                runSearch(value?.label || '');
              }
            }
          }
          onInputChange={
            (e, value, reason) => {
              if (reason == 'input') {
                setSearchTerms(value || '');
                console.log(value);
                //updateOptions(value);
              }
              console.log("OnInputChange", value, reason);
              if (reason === 'reset') {
                console.log("RESET!");
                //runSearch(value?.label || '');
              }
            }
          }
          onHighlightChange={
            (e, option, reason) => {
              if (option) {
                optionHighlighted.current = true;
              } else {
                optionHighlighted.current = false;
              }
              console.log("OnHighlightChange", option, reason);
            }
          }
          onOpen={
            (e, newValue) => {
              
              console.log("OnOpen");
            }
          }
          onClose={
            (e, newValue) => {
              
              console.log("OnClose");
            }
          }
          /*
          renderTags={
            (value, getProps) => {
              console.log("We have render tags change");
              console.log(value);
            }
          }
          */
          /*
          getOptionLabel={
            (option) => {
              return 'Henlo';
            }
          }
          */
          renderInput={(params) => {
            console.log(params);
            return (
            <TextField
              {...params}
              inputRef={searchBar}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => runSearch()} edge='start'>
                      <SearchIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && optionHighlighted.current === false) {
                  runSearch();
                }
              }}
              placeholder='Search Courses'/>
            )
          }}
        /*
        onHighlightChange={(e, option) => {
          console.log(e);
          console.log(option);
          if (option) {
            dropdownHighlighted.current = true;
          }
        }}
        onClose={(e) => {
          dropdownHighlighted.current = false;
        }}*/
      />
    );
}