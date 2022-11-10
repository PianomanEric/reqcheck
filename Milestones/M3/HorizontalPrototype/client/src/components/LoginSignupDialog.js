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
    Link,
    List,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function MessageDialog(props) {

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    }

    const handlePageChange = (pageName) => {
        if (props.onPageChange) {
            props.onPageChange(pageName);
        }
    }

    const handleLogin = () => {
        handleClose();
    }

    const handleSignup = () => {
        handleClose();
    }

    return (
        <Dialog {...props}>
            <DialogTitle align='center'>
                {
                    props.page == "Login" ? "Login" : "Create Your Account"
                }
            </DialogTitle>
            {
                (props.page == "Login") ? 
                <>
                    <TextField size="small" placeholder="Email / Student ID" type="username" sx={{mx: 2, my: 0.5}}/>
                    <TextField size="small" placeholder="Password" type="password" sx={{mx: 2, my: 0.5}}/>

                    <Typography align="center" sx={{
                        mt: 2,
                    }}>
                        New to ReqCheck?
                    </Typography>

                    <Button onClick={() => {handlePageChange("Signup")}} sx={{
                        mb: 1,
                    }}>
                        Register an account!
                    </Button>

                    <DialogActions>
                        <Button onClick={handleLogin} variant='contained' size='large' fullWidth sx={{
                            color: "common.white",
                        }}>
                            Log In
                        </Button>
                    </DialogActions>
                </>:<>
                    <TextField size="small" placeholder="Student ID" type="username" sx={{mx: 2, my: 0.5}}/>
                    <TextField size="small" placeholder="SFSU Email" type="email" sx={{mx: 2, my: 0.5}}/>
                    <TextField size="small" placeholder="Password" type="password" sx={{mx: 2, my: 0.5}}/>

                    <Typography align="center" sx={{
                        mt: 2,
                    }}>
                        Already have an account?
                    </Typography>

                    <Button onClick={() => {handlePageChange("Login")}} sx={{
                        mb: 1,
                    }}>
                        Log in instead!
                    </Button>
                    <DialogActions>
                        <Button onClick={handleSignup} variant='contained' size='large' fullWidth sx={{
                            color: "common.white",
                        }}>
                            Create Account
                        </Button>
                    </DialogActions>
                </>
            }
        </Dialog>
    );
}