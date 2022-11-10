import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';

const pages = [
    {
        title: "Student Profile",
        path: "/profile",
    },
    {
        title: "Courses",
        path: "/courses",
    },
    {
        title: "Course Equivalencies",
        path: "/equivalencies",
    },
    {
        title: "Roadmap",
        path: "/roadmap",
    },
]

export default function Home() {
    useEffect(() => {
        document.title = "ReqCheck | Home";
    }, []);

    const showMessage = (message) => {
        setMessage(message);
        setVisible(true);
    }

    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
    }

    return (
        <>
            <Typography align="center" variant="h4" sx={{
                mt: 9,
                mb: 6,
                p: 3,
                color: "common.black",
                width: "100%",
            }}>
                College transfers made easy.
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
                            <Link to={page.path ? page.path : "/"} onClick={!page.path ? () => {
                                alert(`The ${page.title} page will be implemented in Milestone 4`)
                            } : undefined} sx={{
                                p: 2,
                            }}>
                                <Box sx={{
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
                                }}>
                                    <Typography align="center" variant="h6" sx={{
                                        color: "common.black"
                                    }}>
                                        {page.title}
                                    </Typography>
                                </Box>
                            </Link>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}