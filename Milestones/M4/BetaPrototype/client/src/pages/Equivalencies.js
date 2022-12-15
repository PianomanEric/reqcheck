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

import EquivalencySearchBar from '../components/EquivalencySearchBar';

export default function Equivalencies() {
    const [university, setUniversity] = useState('');
    const [course, setCourse] = useState('');

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
                        (course != null && course != '') ?
                        <>
                            <Box sx={{
                                bgcolor: '#fff',
                                p: 4,
                            }}>
                                <Typography gutterBottom align='center' variant='h4' sx={{
                                    width: '100%',
                                }}>
                                    CSC 230
                                </Typography>
                                <Typography gutterBottom align='center' variant='h5' sx={{
                                    width: '100%',
                                }}>
                                    (San Francisco State University)
                                </Typography>
                                <Typography gutterBottom align='center' variant='h5' sx={{
                                    width: '100%',
                                }}>
                                    Credits: 3
                                </Typography>
                                <Typography gutterBottom sx={{
                                    width: '100%',
                                    fontWeight: 'bold',
                                }}>
                                    Description:
                                </Typography>
                                <Typography gutterBottom sx={{
                                    width: '100%',
                                }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut elit non eros condimentum mattis. Phasellus augue lacus, ultricies sit amet nisi non, cursus ultricies nisi. Aenean bibendum interdum dui in tincidunt. Suspendisse potenti. Morbi et iaculis felis. Donec dictum nibh at dui pharetra, at rhoncus sapien aliquet. Nullam ultrices purus non nisl semper elementum. Morbi vulputate ex in felis vulputate, nec molestie lectus consectetur. Integer non enim id est mattis ultrices. Aliquam nibh nisl, rhoncus et euismod sed, condimentum non elit. In iaculis diam a dolor hendrerit, egestas sagittis libero egestas. Proin id placerat urna.
                                </Typography>
                            </Box>
                    </> : undefined
                    }
                </> : undefined 
            }
        </Box>
    </>);
}