import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BalanceIcon from '@mui/icons-material/Balance';
import SchoolIcon from '@mui/icons-material/School';

import LibraryImage from '../assets/images/library.jpg';

const pages = [
    {
        title: "Student Profile",
        path: "/profile",
        description: "Change your account information or view important changes to your degree.",
        icon: AccountCircleIcon,
    },
    {
        title: "Courses",
        path: "/courses",
        description: "View and manage all your degree requirements in one place.",
        icon: SchoolIcon,
    },
    {
        title: "Course Equivalencies",
        path: "/equivalencies",
        description: "View all granted equivalencies or submit new ones.",
        icon: BalanceIcon,
    },
    {
        title: "Roadmap",
        path: "/roadmap",
        description: "Organize your future courses by semester.",
        icon: CalendarMonthIcon,
    },
]

export default function Home() {
    useEffect(() => {
        document.title = "ReqCheck | Home";
    }, []);

    return (
        <Box container="div" sx={{
            backgroundImage: `url(${LibraryImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            p: 0,
            flexGrow: 1,
        }}>
            <Box sx={{
                m: 0,
                width: "100%",
                height: "100%",
                backdropFilter: `brightness(0.35)`,
            }}>
                <Typography align="center" variant="h2" sx={{
                    px: 3,
                    py: 9,
                    width: "100%",
                    color: "common.white",
                    fontWeight: "400",
                }}>
                    College transfers made easy
                </Typography>
                {/* <Button onClick={()=> testDB()} sx={{
                    bgcolor: "common.white",
                    boxShadow: "3",
                    mx: "auto",
                }}>
                    Test DB
                </Button> */}
                <Grid container spacing="0" maxWidth={"lg"} sx={{
                    justifyContent: "center",
                    mx: "auto",
                }}>
                    {
                        pages.map((page) => (
                            <Grid key={page.title} item sx={{
                                p: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Card sx={{
                                    width: "350px",
                                    height: "270px",
                                    m: 2,
                                }}>
                                    <CardActionArea component={RouterLink} to={page.path ? page.path : "/"} sx={{
                                        height: "100%",
                                    }}>
                                    {/*
                                        sx={{
                                        bgcolor: "common.white",
                                        minHeight: "200px",
                                        width: "300px",
                                        borderRadius: 4,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: 3,
                                        "&:hover": {
                                            bgcolor: "#f6f6f6"
                                        }
                                    }}
                                    */}
                                    <CardContent>
                                        <CardMedia component={page.icon} sx={{
                                            width: "100%",
                                            height: "100px",
                                            color: "primary.light",
                                            margin: 1,
                                        }}>

                                        </CardMedia>
                                        <Typography gutterBottom align="center" variant="h6" sx={{
                                            color: "common.black"
                                        }}>
                                            {page.title}
                                        </Typography>
                                        <Typography align="center" sx={{
                                            color: "common.black"
                                        }}>
                                            {page.description}
                                        </Typography>
                                    </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    );
}