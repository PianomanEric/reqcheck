import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Divider,
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

export default function Roadmap() {
    useEffect(() => {
        document.title = 'ReqCheck | Roadmap';
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
                Roadmap Under Construction
            </Typography>
        </Box>
    </>);
}