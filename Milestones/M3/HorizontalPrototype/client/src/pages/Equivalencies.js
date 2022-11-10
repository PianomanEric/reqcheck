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
import React, { useState, useEffect } from 'react';

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
                my: 5,
            }}>
                Course equivalencies page will be implemented in Milestone 4
            </Typography>
        </Box>
    </>);
}