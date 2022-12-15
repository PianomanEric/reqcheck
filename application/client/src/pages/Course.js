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
import { decodeCourseID } from '../util/FormatData';
import CourseCard from '../components/CourseCard';

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

    if (previousCourseID.current !== courseID) {
        console.log("Loading!");
        getCourseInfo(courseID).then((info) => {
            console.log(info);
            setCourseInfo(info);
        });
        previousCourseID.current = courseID;
    }

    useEffect(() => {
        if (courseInfo && courseInfo.courseID) {  
            document.title = `ReqCheck | ${decodeCourseID(courseInfo.courseID.toUpperCase())}`;
        } else {
            document.title = `ReqCheck`;
        }
    }, [courseInfo]);

    return ( courseInfo && courseInfo.courseID ? <>
        <Container maxWidth='md' sx={{
            p: 5,
        }}>
            <CourseCard courseData={courseInfo}/>
        </Container>
    </> : <></>);
}