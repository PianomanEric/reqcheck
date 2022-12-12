import React, { useEffect } from "react";
import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const teamMembers = [
    "Eric Falk",
    "Erik Rodriguez",
    "Alex Sanchez",
    "Victoria Wilson-Anumudu",
    "Syed Faiz",
    "Vivek Santoki",
];

const getUrlName = (fullName) => {
    const nameChunks = fullName.split(" ");
    return nameChunks[0].toLowerCase();
}

export default function About() {
    useEffect(() => {
        document.title = "ReqCheck | About";
    }, []);

    return (
        <Box maxWidth="md" sx={{
            mx: "auto",
        }}>
            <Typography align="center" variant="h4" sx={{
                width: "100%",
                mt: 3,
                py: 3,
            }}>
                Team Members
            </Typography>
            {teamMembers.map((name) => (
                <Link component={RouterLink} key={name} to={`/about/${getUrlName(name)}`}>
                    <Typography variant="body1" align="center" sx={{
                        my: 2,
                    }}>
                        {name}
                    </Typography>
                </Link>
            ))}
        </Box>
    );
}