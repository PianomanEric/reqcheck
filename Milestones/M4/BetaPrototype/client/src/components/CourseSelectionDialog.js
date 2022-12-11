import React, { useEffect, useState, useMemo } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import NavigateBeforeSharpIcon from '@mui/icons-material/NavigateBeforeSharp';
import axios from 'axios';

const CourseListItem = (props) => <>
    <ListItem {...props} sx={{
        p: 0,
    }}>
        <ListItemButton onClick={props.onClick}>
            {props.children}
            <NavigateNextSharpIcon sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
            }}/>
        </ListItemButton>
    </ListItem>
    <Divider/>
</>

export default function CourseSelectionDialog(props) {

    const [showDetails, setShowDetails] = useState(false);
    const [options, setOptions] = useState([]);
    const [course, setCourse] = useState({});

    const handleSeeDetails = (course) => {
        setCourse(course);
        setShowDetails(true);
    }

    const handleBackClick = () => {
        setShowDetails(false);
    }

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    }

    const handleCourseSelection = () => {
        handleClose();
    }

    const updateAreaCourses = async () => {
        try {
            const response = await axios.get(`/api/courses?requirement=${props.area.requirement}`);
            setOptions(response.data);
        } catch(err) {

        }
    }

    useMemo(() => {
        if (props.open) {
            console.log("Opened!?")
            setShowDetails(false);
            setOptions([]);
            updateAreaCourses();
        }
    }, [props.open])

    /*
    useEffect(() => {
        updateAreaCourses();
    }, [props.area])
    */

    return (
        <Dialog fullWidth {...props}>
            <DialogTitle align='center'>
                {props.area.name}
                <IconButton onClick={handleClose} color='inherit' sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}>
                    <CloseIcon/>
                </IconButton>
                {(showDetails) ? <Button onClick={handleBackClick} size='large' startIcon={<NavigateBeforeSharpIcon/>} color='inherit' sx={{
                    position: 'absolute',
                    left: 8,
                    top: 8,
                }}>
                    Back
                </Button> : undefined
                }
            </DialogTitle>
            <Divider/>
            {
                (!showDetails) ? <>
                    <List sx={{
                        pt: 0,
                        overflow: 'auto',
                    }}>
                        {console.log("Got to the map")}
                        {
                            options.map((course) => 
                                <CourseListItem key={course.codeID} onClick={() => handleSeeDetails(course)}>
                                    {course.codeID + ' - ' + course.title}
                                    {console.log("Mapping")}
                                    {console.log(course)}
                                </CourseListItem>
                            )
                        }
                    </List>
                </> : <>
                    <DialogContent>
                        <DialogContentText variant='h5' align='center' sx={{
                            fontWeight: 'bold',
                        }}>
                            {course.codeID + ' - ' + course.title}
                        </DialogContentText>
                        <DialogContentText variant='h7' align='center' sx={{
                            fontWeight: 'bold',
                        }}>
                            {'Credits: ' + course.unit}
                        </DialogContentText>

                        <DialogContentText variant='h7' align='left' sx={{
                            fontWeight: 'bold',
                            mt: 4,
                        }}>
                            Prerequisites:
                        </DialogContentText>
                        <DialogContentText variant='h7' align='left' sx={{
                            mb: 2,
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </DialogContentText>

                        <DialogContentText variant='h7' align='left' sx={{
                            fontWeight: 'bold',
                            mt: 4,
                        }}>
                            Description:
                        </DialogContentText>
                        <DialogContentText variant='h7' align='left' sx={{
                            mb: 2,
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Eu mi bibendum neque egestas congue quisque egestas diam in. Ultricies tristique nulla aliquet enim. Velit aliquet sagittis id consectetur. Ullamcorper eget nulla facilisi etiam dignissim. Turpis tincidunt id aliquet risus feugiat in. Odio eu feugiat pretium nibh. Morbi enim nunc faucibus a. Aenean et tortor at risus viverra. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Eu turpis egestas pretium aenean pharetra magna. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Tempor orci eu lobortis elementum nibh.
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCourseSelection} variant='contained' size='large' fullWidth sx={{
                            color: 'common.white',
                        }}>
                            Select This Course
                        </Button>
                    </DialogActions>
                </>
            }
        </Dialog>
    );
}