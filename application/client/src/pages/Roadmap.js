import React, { useState, useEffect } from 'react';
import {
    Box, Button, Grid, List,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
//import { Row, Col, Container } from 'react-bootstrap';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Roadmap() {
    useEffect(() => {
        document.title = 'ReqCheck | Roadmap';
    }, []);

    const [personName, setPersonName] = React.useState([]);
    const [showRoadMap, setShowRoadMap] = React.useState(false);
    const [showWarning, setShowWarning] = React.useState(false);

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const totalCourse = [
        {
            requirement: 'CSC 210',
            choice: 'CSC 210',
        },
        {
            requirement: 'CSC 211',
            choice: 'CSC 211',
        },
        {
            requirement: 'CSC 220',
            choice: 'CSC 220',
        },
        {
            requirement: 'CSC 230',
            choice: 'CSC 230',
        },
        {
            requirement: 'CSC 256',
            choice: 'CSC 256',
        },
        {
            requirement: 'CSC 300GW',
            choice: 'CSC 300GW',
        },
        {
            requirement: 'CSC 317',
            choice: 'CSC 317',
        },
        {
            requirement: 'CSC 340',
            choice: 'CSC 340',
        },
        {
            requirement: 'CSC 413',
            choice: 'CSC 413',
        },
        {
            requirement: 'CSC 415',
            choice: 'CSC 415'
        },
        {
            requirement: 'CSC 510',
            choice: 'CSC 510',
        },
        {
            requirement: 'CSC 600',
            choice: 'CSC 600',
        },
        {
            requirement: 'CSC 648',
            choice: 'CSC 648',
        },
        {
            requirement: 'CS Elective 1',
            choice: 'CSC 631'
        },
        {
            requirement: 'CS Elective 2',
            choice: 'CSC 633',
        },
        {
            requirement: 'CS Elective 3',
            choice: 'CSC 499',
        },
        {
            requirement: 'CS Elective 4',
            choice: 'CSC 342',
        },
    ]

    const onClickGenerate = () => {
        if(personName.length < 10) {
            setShowWarning(true);
            setShowRoadMap(false);
        }else {
            setShowRoadMap(true);
            setShowWarning(false);
        }
    }

    const returnRoadMap = () => {
        const arr = []
        for(let i=0; i < personName.length; i+= 3) {
            const chunk = personName.slice(i, i+3);
            arr.push(chunk);
        }
        console.log(arr);
        return(
            <>
                {arr.map((item, index) => (
                    <List>
                        Semester: {index}
                        {item.map(item1 => <ListItemText>{item1}</ListItemText>)}
                    </List>
                ))}
            </>
        )
    }

    return (<>
        <Grid container spacing={2}>
            <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"
  maxHeight="100vh">
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Courses" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                            {totalCourse.map((name) => (
                                <MenuItem key={name.requirement} value={name.requirement}>
                                <Checkbox checked={personName.indexOf(name.requirement) > -1} />
                                <ListItemText primary={name.requirement} />
                                </MenuItem>
                            ))}
                    </Select>
            </FormControl>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"
  maxHeight="500px" marginTop="20px" overflowY="scroll">
              <List>Selected Courses:{personName.map((item) => <ListItemText>{item}</ListItemText>)}</List>
            </Grid>
            <div style={{margin: "auto"}}>
            {showWarning && <Alert severity="error">Have to Select Minimum 10 Courses to see the roadmap</Alert>}
            </div>
            <Grid item xs={12} style={{alignItems: "center", marginLeft: "42%"}}>
            <Button variant="contained" onClick={() => onClickGenerate()}>Generate Roadmap</Button>
            </Grid>
        </Grid>
        <Grid container spacing={2} style={{marginTop: "20px"}}>
        {showRoadMap &&
            <>
                <Grid item xs={12} style={{alignItems: "center", marginLeft: "42%"}}>
                    {returnRoadMap()}
                </Grid>
                <Grid item xs={12} style={{alignItems: "center", marginLeft: "42%", marginBottom: "20px"}}>
                    <Button variant="outlined" onClick={() => {setShowRoadMap(false); personName([])}}>Close RoadMap</Button>
                </Grid>
                </>
                }
        </Grid>
    </>);
}