import React, { useState } from 'react';
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";

export default function MessageDialog(props) {

    return (
        <Dialog {...props}>
            <DialogContent>
                <DialogContentText>
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    );
}