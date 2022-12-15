import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Typography,
} from '@mui/material';

import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { decodeCourseID } from '../util/FormatData';

import QuadImage from '../assets/images/quad2.jpg';

const getCourses = async (searchTerms) => {
    try {
        const response = await axios.get(`/api/courses/search?query=${searchTerms}`);
        console.log(response);
        return response.data
    } catch(err) {

    }
}

export default function Course() {
    const { search } = useLocation();
    const searchTerms = (new URLSearchParams(search)).get('query');
    const previousSearchTerms = useRef();
    const [ results, setResults ] = useState([]);
    const loading = useRef(false);

    if (previousSearchTerms.current !== searchTerms) {
        console.log("Loading!");
        getCourses(searchTerms).then((info) => {
            console.log(info);
            loading.current = false;
            setResults(info);
        });
        loading.current = true;
        previousSearchTerms.current = searchTerms;
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
                backgroundImage: `url(${QuadImage})`,
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
                    backdropFilter: `brightness(0.5) blur(3px)`,
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
                {(results.length > 0) ? `Displaying ${results.length} result${(results.length === 1) ? '' : 's'} for "${searchTerms}"`
                : `No results found for "${searchTerms}"`}
            </Typography>
            {results.map((result) => <Card key={result.courseID} sx={{
                width: 'auto',
                height: 'auto',
                m: 2,
            }}>
                <CardActionArea component={RouterLink} to={`/course/${result.courseID}`} sx={{
                    height: '100%',
                }}>
                <CardContent>
                    <Typography gutterBottom align='center' variant='h6' sx={{
                        color: 'common.black'
                    }}>
                        {`${decodeCourseID(result.courseID)} - ${result.title} (${result.unit} credits)`}
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