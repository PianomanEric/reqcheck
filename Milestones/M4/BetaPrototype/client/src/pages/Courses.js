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

import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditSharpIcon from '@mui/icons-material/EditSharp';

import CourseSelectionDialog from '../components/CourseSelectionDialog';
import PrerequisiteDialog from '../components/PrerequisiteDialog';

import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';
import ScheduleSharpIcon from '@mui/icons-material/ScheduleSharp';
import InfoIcon from '@mui/icons-material/Info';

import LibraryImage from '../assets/images/library.jpg';

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
                requirement: 'A1 - Oral Communication',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'A2 - Written Communication I',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'A3 - Critical Thinking',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'B1 - Physical Sciences',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'B2 - Life Sciences',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'B3 - Laboratory Science',
                choice: undefined,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                requirement: 'B4 - Quantitative Reasoning',
                choice: undefined,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                requirement: 'C1 - Arts',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'C2 - Humanities',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'C1 or C2 - Arts or Humanities',
                choice: 'AAA 100',
                status: COURSE_STATUS.IN_PROGRESS,
                canEdit: true,
            },
            {
                requirement: 'D - Social Studies',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'E - Lifelong Learning and Self-Development',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'UD-B - Physical/Life Science',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
            {
                requirement: 'UD-C - Arts/Humanities',
                choice: undefined,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                requirement: 'UD-D - Social Sciences',
                choice: 'AAA 100',
                status: COURSE_STATUS.COMPLETED,
                canEdit: true,
            },
        ]
    },
    {
        title: 'Math and Physics',
        courses: [
            {
                requirement: 'MATH 226',
                choice: 'MATH 226',
                status: COURSE_STATUS.IN_PROGRESS,
            },
            {
                requirement: 'MATH 227',
                choice: 'MATH 227',
                status: COURSE_STATUS.READY,
            },
            {
                requirement: 'MATH 324',
                choice: 'MATH 324',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                requirement: 'MATH 325',
                choice: 'MATH 325',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                requirement: 'PHYS 220',
                choice: 'PHYS 220',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                requirement: 'PHYS 222',
                choice: 'PHYS 222',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                requirement: 'PHYS 230',
                choice: 'PHYS 230',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                requirement: 'PHYS 232',
                choice: 'PHYS 232',
                status: COURSE_STATUS.NOT_READY,
            },
        ]
    },
    {
        title: 'Computer Science',
        courses: [
            {
                requirement: 'CSC 210',
                choice: 'CSC 210',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 211',
                choice: 'CSC 211',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 220',
                choice: 'CSC 220',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 230',
                choice: 'CSC 230',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 256',
                choice: 'CSC 256',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 300GW',
                choice: 'CSC 300GW',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 317',
                choice: 'CSC 317',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 340',
                choice: 'CSC 340',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 413',
                choice: 'CSC 413',
                status: COURSE_STATUS.COMPLETED,
            },
            {
                requirement: 'CSC 415',
                choice: 'CSC 415',
                status: COURSE_STATUS.IN_PROGRESS,
            },
            {
                requirement: 'CSC 510',
                choice: 'CSC 510',
                status: COURSE_STATUS.READY,
            },
            {
                requirement: 'CSC 600',
                choice: 'CSC 600',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                requirement: 'CSC 648',
                choice: 'CSC 648',
                status: COURSE_STATUS.NOT_READY,
            },
            {
                requirement: 'CS Elective 1',
                choice: 'CSC 631',
                status: COURSE_STATUS.IN_PROGRESS,
                canEdit: true,
            },
            {
                requirement: 'CS Elective 2',
                choice: undefined,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                requirement: 'CS Elective 3',
                choice: undefined,
                status: COURSE_STATUS.READY,
                canEdit: true,
            },
            {
                requirement: 'CS Elective 4',
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

    const handleShowPrerequisites = () => {
        setShowPrerequisites(true);
    }

    const handleClosePrerequisites = () => {
        setShowPrerequisites(false);
    }

    const [currentTab, setCurrentTab] = useState('All');
    const [showPrerequisites, setShowPrerequisites] = useState(false);

    const handleTabChange = (event, newTab) => {
        console.log(newTab);
        setCurrentTab(newTab);
    }

    const handleEditClick = () => {
        setShowCourseSelectionDialog(true);
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
                    backdropFilter: `brightness(0.35)`,
                }}>
                    <Typography align='center' variant='h2' sx={{
                        px: 3,
                        py: 9,
                        width: '100%',
                        color: 'common.white',
                        fontWeight: '400',
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
                    bgcolor: 'common.white'
                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h6'>
                            {category.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        boxShadow: 'none',
                    }}>
                        <TableContainer component={TableBackground}>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left' sx={{width: '50%'}}>Requirement</TableCell>
                                        <TableCell align='left' sx={{width: '50%'}} colSpan={2}>Course</TableCell>
                                        <TableCell align='center' sx={{width: '6px'}}>Units</TableCell>
                                        <TableCell align='center' sx={{width: '6px'}}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    category.courses.map((course) => (
                                        isInCategory(course, currentTab) ?
                                            <TableRow key={course.requirement}>
                                                <TableCell align='left'>{course.requirement}</TableCell>
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
                                                            <IconButton onClick={handleEditClick} size='small' sx={{
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
        <CourseSelectionDialog onClose={() => setShowCourseSelectionDialog(false)} open={showCourseSelectionDialog}/>
        <PrerequisiteDialog onClose={handleClosePrerequisites} open={showPrerequisites}/>
    </>);
}