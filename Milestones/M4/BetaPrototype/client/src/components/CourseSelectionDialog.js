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



const CourseListItem = (props) => <>
    <ListItem {...props} sx={{
        p: 0,
    }}>
        <ListItemButton onClick={props.onClick}>
            AAA 100 - Dummy Course
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

    useMemo(() => {
        if (props.open) {
            setShowDetails(false);
        }
    }, [props.open])

    const handleSeeDetails = () => {
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

    useEffect(() => {
        //setShowDetails(false);
    })

    return (
        <Dialog fullWidth {...props}>
            <DialogTitle align='center'>
                A# - Dummy Requirement Area
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
                        <CourseListItem onClick={handleSeeDetails}/>
                        <CourseListItem onClick={handleSeeDetails}/>
                        <CourseListItem onClick={handleSeeDetails}/>
                        <CourseListItem onClick={handleSeeDetails}/>
                        <CourseListItem onClick={handleSeeDetails}/>
                        <CourseListItem onClick={handleSeeDetails}/>
                        <CourseListItem onClick={handleSeeDetails}/>
                        <CourseListItem onClick={handleSeeDetails}/>
                        <CourseListItem onClick={handleSeeDetails}/>
                    </List>
                </> : <>
                    <DialogContent>
                        <DialogContentText variant='h5' align='center' sx={{
                            fontWeight: 'bold',
                        }}>
                            AAA 100 - Dummy Course
                        </DialogContentText>
                        <DialogContentText variant='h7' align='center' sx={{
                            fontWeight: 'bold',
                        }}>
                            Credits: 3
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