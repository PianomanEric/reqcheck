import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardActionArea,
    CardContent,
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
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import LibraryImage from '../assets/images/library.jpg';

const getCourses = async (searchTerm) => {
    try {
        const response = await axios.get(`/api/courses/search?query=${searchTerm}`);
        console.log(response);
        return response.data
    } catch(err) {

    }
}

export default function Course() {
    const { search } = useLocation();
    const searchTerm = (new URLSearchParams(search)).get('query');
    const previousSearchTerm = useRef();
    const [ results, setResults ] = useState([]);
    const loading = useRef(false);

    const formatCourseID = (courseID) => {
        if (courseID) {
            return courseID.replace(/(^[a-zA-Z]+)/g, '$1 ');
        }
    }

    if (previousSearchTerm.current !== searchTerm) {
        console.log("Loading!");
        getCourses(searchTerm).then((info) => {
            console.log(info);
            loading.current = false;
            setResults(info);
        });
        loading.current = true;
        previousSearchTerm.current = searchTerm;
    }

    useEffect(() => {
        document.title = `ReqCheck | Course Search`;
    }, []);

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
                        textShadow: '0 0 25px #000',
                    }}>
                        Search Results
                    </Typography>
                </Box>
            </Box>
        </Box>

        <Container maxWidth='md' sx={{
            p: 5,
        }}>
            {!loading.current ? <>
            <Typography align='center'>
                {(results.length > 0) ? `Displaying ${results.length} result${(results.length === 1) ? '' : 's'} for "${searchTerm}"`
                : `No results found for "${searchTerm}"`}
            </Typography>
            {results.map((result) => <Card key={result.codeID} sx={{
                width: 'auto',
                height: 'auto',
                m: 2,
            }}>
                <CardActionArea component={RouterLink} to={`/course/${result.codeID}`} sx={{
                    height: '100%',
                }}>
                <CardContent>
                    <Typography gutterBottom align='center' variant='h6' sx={{
                        color: 'common.black'
                    }}>
                        {`${result.codeID} - ${result.title} (${result.unit} credits)`}
                    </Typography>
                    <Typography align='center' sx={{
                        color: 'common.black'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt.
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
            )}
            </> : <></>
            }
        </Container>
    </>);
}