import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    IconButton
} from '@mui/material';

import React, { useState, useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const getCourseInfo = async (courseID) => {
    try {
        const response = await axios.get(`/api/courses/${courseID}`);
        console.log(response);
        return response.data
    } catch(err) {

    }
}

export default function Course() {
    const { courseID } = useParams();
    const previousCourseID = useRef(null);
    const [ courseInfo, setCourseInfo ] = useState({});

    const formatCourseID = (courseID) => {
        if (courseID) {
            return courseID.replace(/(^[a-zA-Z]+)/g, '$1 ');
        }
    }

    if (previousCourseID.current !== courseID) {
        console.log("Loading!");
        getCourseInfo(courseID).then((info) => {
            console.log(info);
            setCourseInfo(info);
        });
        previousCourseID.current = courseID;
    }

    useEffect(() => {
        if (courseInfo && courseInfo.codeID) {  
            document.title = `ReqCheck | ${formatCourseID(courseInfo.codeID.toUpperCase())}`;
        } else {
            document.title = `ReqCheck`;
        }
    }, [courseInfo]);

    return ( courseInfo && courseInfo.codeID ? <>
        <Container maxWidth='md' sx={{
            p: 5,
        }}>
            <Typography align='center' variant='h4'>
                {formatCourseID(courseInfo.codeID) + ' - ' + courseInfo.title}
            </Typography>
            <Typography align='center' variant='h5'>
                {'Credits: ' + courseInfo.unit}
            </Typography>
            <Typography align='center' variant='h5'>
                {'Division: ' + courseInfo.division}
            </Typography>
        </Container>
    </> : <></>);
}