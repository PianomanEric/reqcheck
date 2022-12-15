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
import LibraryImage from '../assets/images/library2.jpg';

export default function Equivalencies() {
    const [schoolList, setSchoolList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [school, setSchool] = useState();
    const [course, setCourse] = useState();
    const [courseData, setCourseData] = useState();

    const updateSchools = () => {
        axios.get(`/api/equivalencies/schools`).then((res) => {
            setSchoolList(res.data);
        });
    }

    const updateCourses = () => {
        setCourse();
        console.log("Reset the course!!");
        if (school && school !== '') {
            console.log(school);
            axios.get(`/api/equivalencies?school=${school}`).then((res) => {
                console.log(res);
                setCourseList(res.data.map((element) => {
                    return {
                        courseID: element.equivalentCourse,
                        label: `${element.foreignCourse} - ${element.classtitle}`,
                    }
                }));
                console.log(courseList);
            });
        }
    }

    useEffect(() => {
        updateCourses();
    }, [school]);

    useEffect(() => {
        console.log(school, course);
        if (course) {
            axios.get(`/api/courses/search?query=${course.courseID}`).then((res) => {
                console.log(res.data);
                setCourseData(res?.data?.[0]);
            });
        }
    }, [course]);

    useEffect(() => {
        document.title = 'ReqCheck | Course Equivalencies';
        updateSchools();
    }, []);

    return (<>
        <Box container='div' sx={{
            backgroundImage: `url(${LibraryImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            p: 0,
            maxHeight: '216px',
            flexGrow: 1,
        }}>
            <Box sx={{
                m: 0,
                width: '100%',
                height: '100%',
                backdropFilter: `brightness(0.65) blur(3px)`,
            }}>
                <Typography align='center' variant='h2' sx={{
                    px: 3,
                    py: 9,
                    width: '100%',
                    color: 'common.white',
                    fontWeight: '400',
                    textShadow: '0 0 25px #000',
                }}>
                    Course Equivalencies
                </Typography>
            </Box>
        </Box>
        <Box sx={{
            width: '100%',
            mx: 'auto',
            mb: 4,
            maxWidth: 'md',
        }}>
            <Box sx={{
                bgcolor: '#fff',
                width: '100%',
                p: 5,
                my: 2,
            }}>
                <Typography gutterBottom align='center' variant='h4' sx={{
                    width: '100%',
                }}>
                    Select a college/university
                </Typography>
                <EquivalencySearchBar options={schoolList} placeholder={"Choose a college/university"} value={school} setValue={setSchool}/>
            </Box>

            {
                school ?
                <>
                    <Box sx={{
                        bgcolor: '#fff',
                        width: '100%',
                        p: 5,
                        my: 2,
                    }}>
                        <Typography gutterBottom align='center' variant='h4' sx={{
                            width: '100%',
                        }}>
                            Select a course
                        </Typography>
                        <EquivalencySearchBar options={courseList} placeholder={`Choose a course from ${school}`} value={course} setValue={setCourse}/>
                    </Box>
                    {
                        course ? 
                            <CourseCard courseData={courseData}/>
                        : undefined
                    }
                </> : undefined 
            }
        </Box>
    </>);
}