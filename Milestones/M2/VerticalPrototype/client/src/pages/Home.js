import { Box, Grid, Link, Typography } from "@mui/material";
import { useEffect } from "react";

const pages = [
    {
        title: "Profile",
        path: "/profile"
    },
    {
        title: "Courses",
        path: "/courses"
    },
    {
        title: "Course Equivalencies",
        path: "/equivalencies"
    },
    {
        title: "Transfer Agreements",
        path: "/agreements"
    },
    {
        title: "Roadmap",
        path: "/roadmap"
    },
    {
        title: "Exams",
        path: "/exams"
    },
    {
        title: "Internships",
        path: "/internships"
    },
    {
        title: "Jobs",
        path: "/jobs"
    },
    {
        title: "Other",
        path: "/resources"
    },
]

export default function Home() {
    useEffect(() => {
        document.title = "ReqCheck | Home";
    }, []);

    return (
        <>
            <Typography align="center" variant="h4" sx={{
                mt: 3,
                p: 3,
                color: "common.black",
                width: "100%",
            }}>
                College Graduation Simplified
            </Typography>
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
                            <Link to={"/"} onClick={() => {alert(`This will redirect to ${page.title} page`)}} sx={{
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