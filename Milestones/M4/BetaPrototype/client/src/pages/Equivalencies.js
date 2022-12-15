import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Divider,
    Grid,
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
import axios from 'axios';

import EquivalencySearchBar from '../components/EquivalencySearchBar';
import CourseCard from '../components/CourseCard';

export default function Equivalencies() {
    const [university, setUniversity] = useState('');
    const [course, setCourse] = useState('');
    const [courseData, setCourseData] = useState();
    useEffect(() => {
        axios.get(`/api/courses/search?query=${course}`).then((res) => {
            setCourseData(res?.data?.[0]);
        });
    }, [course]);

    useEffect(() => {
        document.title = 'ReqCheck | Course Equivalencies';
    }, []);

    return (<>
        <Box sx={{
            bgcolor: '#fff',
            width: '100%',
        }}>
            <Typography align='center' variant='h4' sx={{
                mt: 9,
                mb: 6,
                p: 3,
                width: '100%',
            }}>
                Course Equivalencies Under Construction
            </Typography>
        </Box>
        <Box sx={{
            width: '100%',
            mx: 'auto',
            maxWidth: 'md',
        }}>
            <Box sx={{
                bgcolor: '#fff',
                width: '100%',
                p: 5,
                my: 1,
            }}>
                <Typography gutterBottom align='center' variant='h4' sx={{
                    width: '100%',
                }}>
                    Select a college/university
                </Typography>
                <EquivalencySearchBar options={['', '1', '2', '3']} value={university} setValue={setUniversity}/>
            </Box>

            {
                (university != null && university != '') ?
                <>
                    <Box sx={{
                        bgcolor: '#fff',
                        width: '100%',
                        p: 5,
                        my: 1,
                    }}>
                        <Typography gutterBottom align='center' variant='h4' sx={{
                            width: '100%',
                        }}>
                            Select a course
                        </Typography>
                        <EquivalencySearchBar options={['', '4', '5', '6']} value={course} setValue={setCourse}/>
                    </Box>
                    {
                        (course != null && course != '') ? <CourseCard courseData={courseData}/>: undefined
                    }
                </> : undefined 
            }
        </Box>
    </>);
}