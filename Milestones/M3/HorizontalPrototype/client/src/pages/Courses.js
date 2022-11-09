import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Divider,
    Paper,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';

const TABS = [
    "All",
    "Future",
    "In Progress",
    "Completed",
]

const DEGREE_INFO = [
    {
        title: "General Education",
        subcategories: [
            {
                title: "Area A",
                courses: [
                    {
                        requirement: "A1 - Oral Communication",
                        choice: undefined,
                    },
                    {
                        requirement: "A2 - Written Communication I",
                        choice: undefined,
                    },
                    {
                        requirement: "A3 - Critical Thinking",
                        choice: undefined,
                    },
                ],
            },
            {
                title: "Area B",
                courses: [
                    {
                        requirement: "B1 - Physical Sciences",
                        choice: undefined,
                    },
                    {
                        requirement: "B2 - Life Sciences",
                        choice: undefined,
                    },
                    {
                        requirement: "B3 - Laboratory Science",
                        choice: undefined,
                    },
                    {
                        requirement: "B4 - Quantitative Reasoning",
                        choice: undefined,
                    },
                ],
            },
            {
                title: "Area C",
                courses: [
                    {
                        requirement: "C1 - Arts",
                        choice: undefined,
                    },
                    {
                        requirement: "C2 - Humanities",
                        choice: undefined,
                    },
                    {
                        requirement: "C1 or C2 - Arts or Humanities",
                        choice: undefined,
                    },
                ],
            },
            {
                title: "Area D",
                courses: [
                    {
                        requirement: "D - Social Studies",
                        choice: undefined,
                    },
                ],
            },
            {
                title: "Area E",
                courses: [
                    {
                        requirement: "E - Lifelong Learning and Self-Development",
                        choice: undefined,
                    },
                ],
            },
            {
                title: "Upper Division",
                courses: [
                    {
                        requirement: "UD-B - Physical/Life Science",
                        choice: undefined,
                    },
                    {
                        requirement: "UD-C - Arts/Humanities",
                        choice: undefined,
                    },
                    {
                        requirement: "UD-D - Social Sciences",
                        choice: undefined,
                    },
                ],
            },
        ]
    },
    {
        title: "Computer Science",
        subcategories: [
            {
                title: "???",
                courses: [
                    {
                        requirement: "A1 - Oral Communication",
                        choice: undefined,
                    },
                    {
                        requirement: "A2 - Written Communication I",
                        choice: undefined,
                    },
                    {
                        requirement: "A3 - Critical Thinking",
                        choice: undefined,
                    },
                ],
            },
        ]
    },
    /*
    {
        title: "Mathematics and Physics",
        courses: [
            {
                requirement: "A1 - Oral Communication",
                choice: undefined,
            },
        ]
    },*/
]

const TableBackground = (props) => <Box {...props} sx={{
    bgcolor: "common.white",
}} />

export default function Courses() {
    useEffect(() => {
        document.title = "ReqCheck | Courses";
    }, []);

    const [currentTab, setCurrentTab] = useState("All")

    const handleTabChange = (event, newTab) => {
        console.log(newTab);
        setCurrentTab(newTab)
    }

    return (<>
        <Box sx={{
            bgcolor: "#fff",
            width: "100%",
        }}>
            <Typography align="center" variant="h2" sx={{
                mt: 3,
                p: 3,
                color: "common.black",
                width: "100%",
            }}>
                Courses
            </Typography>
            <Box sx={{
                mx: "auto",
                width: "100%"
            }}>
                <Tabs value={currentTab} onChange={handleTabChange} centered>
                    {
                        TABS.map((tabName) => (
                            <Tab label={tabName} value={tabName} key={tabName} />
                        ))
                    }
                </Tabs>
            </Box>
        </Box>
        <Box sx={{
            bgcolor: "#f6f6f6",
            width: "100%",
            height: "100%",
        }}>
            <Container maxWidth="md" sx={{
                p: 5,
            }}>
                {
                DEGREE_INFO.map((category) => (
                    <Accordion key={category.title} sx={{
                        bgcolor: "#f8f9f8"
                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {category.title}
                        </AccordionSummary>
                        <AccordionDetails sx={{
                            padding: 0,
                            boxShadow: "none",
                        }}>
                            <Divider/>
                            <TableContainer component={TableBackground}>
                                <Table>
                                    {
                                        
                                    category.subcategories.map((subcategory) => (<>
                                        <TableHead key={subcategory.title} sx={{
                                            bgcolor: "#f8f9f8"
                                        }}>
                                            <TableRow>
                                                <TableCell align="left">{subcategory.title}</TableCell>
                                                <TableCell align="left">Course</TableCell>
                                                <TableCell align="center">Units</TableCell>
                                                <TableCell align="center">Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                            subcategory.courses.map((course) => (
                                                <TableRow key={course.name}>
                                                    <TableCell align="left">{course.requirement}</TableCell>
                                                    <TableCell align="left">{course.choice}</TableCell>
                                                    <TableCell align="center">3</TableCell>
                                                    <TableCell align="center">Completed</TableCell>
                                                </TableRow>
                                            ))
                                            }
                                        </TableBody>
                                    </>))
                                    
                                    }
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
            </Container>
        </Box>
    </>);
}