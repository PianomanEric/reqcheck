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
    IconButton
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

const DEGREE_INFO = [
    {
        title: 'General Education',
        courses: [
            {
                name: 'A1: Oral Communication',
                requirement: 'A1',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'A2: Written English Comm',
                requirement: 'A2',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'A3: Critical Thinking',
                requirement: 'A3',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'B1: Physical Science',
                requirement: 'B1',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'B2: Life Science',
                requirement: 'B2',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'B3: Lab Science',
                requirement: 'B3',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'B4: Math/QR',
                requirement: 'B4',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'C1: Arts',
                requirement: 'C1',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'C2: Humanities',
                requirement: 'C2',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'C1 or C2: Arts or Humanities',
                requirement: 'C1|C2',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'D: Social Sciences',
                requirement: 'D1|D2|D3',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'E: Lifelong Learning and self-Development',
                requirement: 'E',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'UD-B: Physical Life Science',
                requirement: 'UDB',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'UD-C: Arts and/or Humanities',
                requirement: 'UDC',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'UD-D: Social Sciences',
                requirement: 'UDD',
                choice: null,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
        ]
    },
    {
        title: 'Math and Physics',
        courses: [
            {
                name: 'MATH 226',
                requirement: 'MATH 226',
                choice: 'MATH 226',
                status: COURSE_STATUS.READY,
            },
            {
                name: 'MATH 227',
                requirement: 'MATH 227',
                choice: 'MATH 227',
                status: COURSE_STATUS.READY,
            },
            {
                name: 'MATH 324',
                requirement: 'MATH 324',
                choice: 'MATH 324',
                status: COURSE_STATUS.READY,
            },
            {
                name: 'MATH 325',
                requirement: 'MATH 325',
                choice: 'MATH 325',
                status: COURSE_STATUS.READY,
            },
            {
                name: 'PHYS 220',
                requirement: 'PHYS 220',
                choice: 'PHYS 220',
                status: COURSE_STATUS.READY,
            },
            {
                name: 'PHYS 222',
                requirement: 'PHYS 222',
                choice: 'PHYS 222',
                status: COURSE_STATUS.READY,
            },
            {
                name: 'PHYS 230',
                requirement: 'PHYS 230',
                choice: 'PHYS 230',
                status: COURSE_STATUS.READY,
            },
            {
                name: 'PHYS 232',
                requirement: 'PHYS 232',
                choice: 'PHYS 232',
                status: COURSE_STATUS.READY,
            },
        ]
    },
    {
        title: 'Computer Science',
        courses: [
            {
                name: 'CSC 210',
                requirement: 'CSC 210',
                choice: 'CSC 210',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 211',
                requirement: 'CSC 211',
                choice: 'CSC 211',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 220',
                requirement: 'CSC 220',
                choice: 'CSC 220',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 230',
                requirement: 'CSC 230',
                choice: 'CSC 230',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 256',
                requirement: 'CSC 256',
                choice: 'CSC 256',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 300GW',
                requirement: 'CSC 300GW',
                choice: 'CSC 300GW',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 317',
                requirement: 'CSC 317',
                choice: 'CSC 317',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 340',
                requirement: 'CSC 340',
                choice: 'CSC 340',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 413',
                requirement: 'CSC 413',
                choice: 'CSC 413',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                name: 'CSC 415',
                requirement: 'CSC 415',
                choice: 'CSC 415',
                status: COURSE_STATUS.IN_PROGRESS,
            },
            {
                name: 'CSC 510',
                requirement: 'CSC 510',
                choice: 'CSC 510',
                status: COURSE_STATUS.READY,
            },
            {
                name: 'CSC 600',
                requirement: 'CSC 600',
                choice: 'CSC 600',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                name: 'CSC 648',
                requirement: 'CSC 648',
                choice: 'CSC 648',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                name: 'CS Elective 1',
                requirement: 'CSCE',
                choice: 'CSC 631',
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'CS Elective 2',
                requirement: 'CSCE',
                choice: undefined,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'CS Elective 3',
                requirement: 'CSCE',
                choice: undefined,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                name: 'CS Elective 4',
                requirement: 'CSCE',
                choice: undefined,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
        ]
    },
]

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

export default function Courses() {
    useEffect(() => {
        document.title = 'ReqCheck | Courses';
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
        <Container maxWidth='md' sx={{
            p: 5,
        }}>
            {
            DEGREE_INFO.map((category) => (
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
                                            <TableRow key={course.name}>
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
                                                            <IconButton onClick={() => handleEditClick({name: course.name, requirement: course.requirement})} size='small' sx={{
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
        <CourseSelectionDialog onClose={() => setShowCourseSelectionDialog(false)} open={showCourseSelectionDialog} area={area}/>
        <PrerequisiteDialog onClose={handleClosePrerequisites} open={showPrerequisites}/>
    </>);
}