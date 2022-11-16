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
} from "@mui/material";
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
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
            }}/>
        </ListItemButton>
    </ListItem>
    <Divider/>
</>

export default function PrerequisiteDialog(props) {

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    }

    return (
        <Dialog fullWidth {...props}>
            <DialogTitle align='center'>
                Prerequisites Not Met
                <IconButton onClick={handleClose} color="inherit" sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                }}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
        <Divider/>
            <DialogContent>
                <DialogContentText variant='h5' align='center' sx={{
                    fontWeight: "bold",
                }}>
                    AAA 100 - Dummy Course
                </DialogContentText>
                <DialogContentText variant='h7' align='center' sx={{
                    fontWeight: "bold",
                }}>
                    Credits: 3
                </DialogContentText>

                <DialogContentText variant='h7' align='left' sx={{
                    fontWeight: "bold",
                    mt: 4,
                }}>
                    Missing Prerequisites:
                </DialogContentText>
                <DialogContentText variant='h7' align='left'>
                    AAA 98
                </DialogContentText>
                <DialogContentText variant='h7' align='left'>
                    AAA 99
                </DialogContentText>

            </DialogContent>
        </Dialog>
    );
}