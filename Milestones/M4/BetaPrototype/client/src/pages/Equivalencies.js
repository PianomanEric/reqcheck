import React, { useState, useEffect } from 'react';
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
} from "@mui/material";

export default function Equivalencies() {
    useEffect(() => {
        document.title = "ReqCheck | Course Equivalencies";
    }, []);

    return (<>
        <Box sx={{
            bgcolor: "#fff",
            width: "100%",
        }}>
            <Typography align="center" variant="h4" sx={{
                mt: 9,
                mb: 6,
                p: 3,
                width: "100%",
            }}>
                Course Equivalencies Under Construction
            </Typography>
        </Box>
    </>);
}