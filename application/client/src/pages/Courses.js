import React, { useState, useEffect } from 'react';
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
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditSharpIcon from '@mui/icons-material/EditSharp';

import CourseSelectionDialog from '../components/CourseSelectionDialog';
import PrerequisiteDialog from '../components/PrerequisiteDialog';

import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';
import ScheduleSharpIcon from '@mui/icons-material/ScheduleSharp';
import InfoIcon from '@mui/icons-material/Info';

import LibraryImage from '../assets/images/library2.jpg';
import axios from 'axios';

import { decodeCourseID } from '../util/FormatData';

const TABS = [
    'All',
    'Future',
    'In Progress',
    'Completed',
]

const COURSE_STATUS = {
    NOT_READY: 'Not Ready',
    READY: 'Ready',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
}

const StatusButton = (props) => <Tooltip title={props.children} placement='right'>
    <IconButton size='small' onClick={props.onClick} variant='contained' {...props} color={
        props.children === COURSE_STATUS.COMPLETED ? 'success' :
        (props.children === COURSE_STATUS.IN_PROGRESS ? 'warning' :
        (props.children === COURSE_STATUS.READY ? 'info' :
        'error'))
    } sx={{
        m: 0,
    }}>
        {
        props.children === COURSE_STATUS.COMPLETED ? <CheckCircleOutlineSharpIcon/> :
        (props.children === COURSE_STATUS.IN_PROGRESS ? <ScheduleSharpIcon/> :
        (props.children === COURSE_STATUS.READY ? <InfoIcon/> :
        <ErrorOutlineSharpIcon/>))
        }
    </IconButton>
</Tooltip>

const TableBackground = (props) => <Box {...props} sx={{
    bgcolor: 'common.white',
}} />

const requirementNames = {
    'A1': 'A1: Oral Communication',
    'A2': 'A2: Written English Communication',
    'A3': 'A3: Critical Thinking',
    'B1': 'B1: Physical Science',
    'B2': 'B2: Life Science',
    'B3': 'B3: Lab Science',
    'B4': 'B4: Math / Quantitative Reasoning',
    'C1': 'C1: Arts',
    'C2': 'C2: Humanities',
    'C1|C2': 'C1 or C2: Arts or Humanities',
    'D1|D2|D3': 'D: Social Sciences',
    'E': 'E: Lifelong Learning Development',
    'UDB' : 'UD-B: Physical Life Science',
    'UDC' : 'UD-C: Arts and/or Humanities',
    'UDD' : 'UD-D: Social Sciences',
    'CSCE' : 'Computer Science Elective',
}

export default function Courses() {
    const [degreePlan, setDegreePlan] = useState([]);

    const translateDegreePlan = (rawPlan) => {
        const plan = [];
        const areas = {};
        for (const requirement of rawPlan) {
            console.log(requirement.group);
            if (!areas[requirement.group]) {
                areas[requirement.group] = [];
            }
            areas[requirement.group].push({
                name: requirement.exact ? decodeCourseID(requirement.category) : (requirementNames[requirement.category] || requirement.category),
                requirement: requirement.category,
                choice: decodeCourseID(requirement.codeID),
                status: COURSE_STATUS.READY,
                canEdit: !requirement.exact,
                reqID: requirement.reqID,
            })
        }
        console.log(areas);
        for (const [area, courses] of Object.entries(areas)) {
            console.log(area, courses);
            plan.push({
                title: area,
                courses: courses,
            });
        }
        setDegreePlan(plan);
    }

    const updateDegreePlan = () => {
        axios.get('/api/courses/plan').then((res) => {
            console.log(res.data);
            if (res.data) {
                translateDegreePlan(res.data);
            }
        });
    }

    useEffect(() => {
        document.title = 'ReqCheck | Courses';
        updateDegreePlan();
    }, []);

    const [showCourseSelectionDialog, setShowCourseSelectionDialog] = useState(false);

    const isInCategory = (course, category) => {
        if (category === 'Future') {
            console.log(course.status);
            console.log(COURSE_STATUS.READY);
            return course.status === COURSE_STATUS.READY || course.status === COURSE_STATUS.NOT_READY;
        } else if (category === 'In Progress' || category === 'Completed') {
            return category === course.status;
        } else {
            return true;
        }
    }

    const handleShowPrerequisites = (area) => {
        setShowPrerequisites(true);
    }

    const handleClosePrerequisites = () => {
        setShowPrerequisites(false);
    }

    const [currentTab, setCurrentTab] = useState('All');
    const [showPrerequisites, setShowPrerequisites] = useState(false);
    const [area, setArea] = useState({});

    const handleTabChange = (event, newTab) => {
        console.log(newTab);
        setCurrentTab(newTab);
    }

    const handleEditClick = (area) => {
        setArea(area);
        setShowCourseSelectionDialog(true);
        console.log(area);
    }

    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('sm'));

    return (<>
        <Box sx={{
            bgcolor: 'common.white',
            width: '100%',
        }}>
            <Box container='div' sx={{
                backgroundImage: `url(${LibraryImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                p: 0,
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
                        Courses
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                mx: 'auto',
                width: '100%'
            }}>
                <Tabs value={currentTab} onChange={handleTabChange} centered sx={{
                                bgcolor: 'common.white',
                            }} >
                    {
                        TABS.map((tabName) => (
                            <Tab label={tabName} value={tabName} key={tabName}/>
                        ))
                    }
                </Tabs>
            </Box>
        </Box>
        {console.log(small)}
        <Container disableGutters={true} maxWidth='md' sx={{
            p: {
                xs: 1,
                sm: 2,
                md: 3,
            },
        }}>
            {
            degreePlan.map((category) => (
                <Accordion defaultExpanded key={category.title} sx={{
                    bgcolor: 'common.white',
                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h6'>
                            {category.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        boxShadow: 'none',
                        px: 1
                    }}>
                        <TableContainer component={TableBackground}>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left' sx={{width: '50%', px: 1}}>Requirement</TableCell>
                                        <TableCell align='left' sx={{width: '50%', px: 1}} colSpan={2}>Course</TableCell>
                                        <TableCell align='center' sx={{width: '6px', px: 1}}>Units</TableCell>
                                        <TableCell align='center' sx={{width: '6px', px: 1}}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    category.courses.map((course) => (
                                        isInCategory(course, currentTab) ?
                                            <TableRow key={course.reqID}>
                                                <TableCell align='left'>{course.name}</TableCell>
                                                <TableCell align='left' sx={{
                                                        color: (course.choice) ? 'common.black' : '#aaa',
                                                        fontStyle: (course.choice) ? undefined : 'italic',
                                                    }}>
                                                    {course.choice || 'No Course Selected'}
                                                </TableCell>
                                                <TableCell sx={{
                                                    p: 0,
                                                    width: '6px',
                                                }}>
                                                    {
                                                        (course.canEdit && course.status !== COURSE_STATUS.COMPLETED && course.status !== COURSE_STATUS.IN_PROGRESS) ? (
                                                        <Tooltip title='Edit' placement='right'>
                                                            <IconButton onClick={() => handleEditClick({name: course.name, requirement: course.requirement, reqID: course.reqID})} size='small' sx={{
                                                                m: 0,
                                                            }}>
                                                                <EditSharpIcon sx={{
                                                                    color: 'primary.main',
                                                                }}/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        ) : undefined
                                                    }
                                                </TableCell>
                                                <TableCell align='center'>3</TableCell>
                                                <TableCell align='center' sx={{
                                                    p: 0,
                                                }}>
                                                    {
                                                        course.status !== COURSE_STATUS.READY ? 
                                                        <StatusButton onClick={(course.status === COURSE_STATUS.NOT_READY) ? handleShowPrerequisites : undefined}>
                                                            {course.status}
                                                        </StatusButton> : undefined
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        : undefined
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            ))
        }
        </Container>
        <CourseSelectionDialog onClose={() => setShowCourseSelectionDialog(false)} open={showCourseSelectionDialog} area={area} onSelect={(reqID, option) => {
            console.log("Option selected!");
            axios.post('/api/courses/plan/update', {
                reqID: reqID,
                courseID: option,
            }).then((res) => {
                console.log(res.data);
                translateDegreePlan(res.data);
            });
        }}/>
        <PrerequisiteDialog onClose={handleClosePrerequisites} open={showPrerequisites}/>
    </>);
}