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

export default function Course(props) {
    const navigate = useNavigate();

    const [searchTerms, setSearchTerms] = useState('');
    const optionHighlighted = useRef(false);

    const searchBar = useRef();
  
    
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
          selectOnFocus
          clearOnBlur
          options={props.options}
          value={props.value}
          sx={{
            mx: 1,
            width: '100%',
            mx: '0',
          }}
          /*
          renderOption={(props, option) => {
            console.log(option);
            return <Box {...props}>
              {option.fullName}
            </Box>
          }}
          */
          onChange={
            (e, value, reason) => {
              if (reason === 'selectOption') {
                console.log('Option selected');
                props.setValue(value);
              }
            }
          }
          onInputChange={
            (e, value, reason) => {
              if (reason == 'input') {
                setSearchTerms(value || '');
                console.log(value);
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
            }
          }
          renderInput={(params) => {
            console.log(params);
            return (
            <TextField
              {...params}
              inputRef={searchBar}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && optionHighlighted.current === false) {
                }
              }}
              />
            )
          }}
      />
    );
}