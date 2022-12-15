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
    return (
        <Autocomplete
          autoHighlight
          selectOnFocus
          clearOnBlur
          options={props.options}
          fullWidth
          //inputValue={props.value}
          sx={{
            mx: 1,
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
              console.log(value);
              props.setValue(value);
            }
          }
          onInputChange={
            (e, value, reason) => {
              /*
              console.log("Input changed!");
              console.log(e);
              console.log(reason);
              console.log(value);
              */
              //props.setValue(value);
            }
          }
          renderInput={(params) => {
            console.log(params);
            return (
            <TextField
              {...params}
              placeholder={props.placeholder}
            />
            )
          }}
      />
    );
}