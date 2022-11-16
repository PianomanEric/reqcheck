import React, { useEffect, useState, useMemo } from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormGroup,
    FormControlLabel,
    IconButton,
    Link,
    List,
    TextField,
    Typography,
} from "@mui/material";
import axios from 'axios';

export default function LoginSignupDialog(props) {

    const [studentID, setStudentID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
        setStudentID("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    const handlePageChange = (pageName) => {
        if (props.onPageChange) {
            props.onPageChange(pageName);
        }
    }

    const handleLogin = () => {
        handleClose();
    }

    const handleSignup = async () => {
        setInputDisabled(true);
        console.log(firstName, lastName, email, password);
        console.log("Trying to create account");
        try{
            const response = await axios.post('/register', {
                data: {
                    firstName,
                    lastName,
                    email,
                    studentID,
                    password
                }
            })
            if(response) {
                setFirstName('');
                setLastName('');
                setStudentID('');
                setEmail('');
                setPassword('');
                handleClose();
            }
            console.log("It worked!");
        } catch(err) {
            console.log(err)
            console.log("It failed");
        }
        console.log("Reenabling buttons");
        setInputDisabled(false);
    }

    return (
        <Dialog fullWidth maxWidth="xs" open={props.open} onClose={props.onClose} PaperProps={{
            sx: {
                p: 3,
            }
        }}>
            <DialogTitle align='center'>
                {
                    props.page == "Login" ? "Login" : "Create Your Account"
                }
            </DialogTitle>
            {
                (props.page == "Login") ? 
                <>
                    <TextField size="small" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" type="email" sx={{mx: 2, my: 0.5}}/>
                    <TextField size="small" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" type="password" sx={{mx: 2, my: 0.5}}/>

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
                        <Button onClick={handleLogin} disabled={inputDisabled} variant='contained' size='large' fullWidth sx={{
                            color: "common.white",
                        }}>
                            Log In
                        </Button>
                    </DialogActions>
                </>:<>
                    <TextField size="small" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} placeholder="First Name" type="name" sx={{mx: 2, my: 0.5}}/>
                    <TextField size="small" value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder="Last Name" type="name" sx={{mx: 2, my: 0.5}}/>
                    <TextField size="small" value={studentID} onChange={(e) => {setStudentID(e.target.value)}} placeholder="Student ID" type="username" sx={{mx: 2, my: 0.5}}/>
                    <TextField size="small" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="SFSU Email" type="email" sx={{mx: 2, my: 0.5}}/>
                    <TextField size="small" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" type="password" sx={{mx: 2, my: 0.5}}/>
                    <FormGroup sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        
                        <FormControlLabel control={<Checkbox/>} label={<>
                            <Typography component="span">
                                I agree to the 
                            </Typography><Link> terms and conditions</Link>
                            </>}/>
                    </FormGroup>

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
                        <Button onClick={handleSignup} disabled={inputDisabled} variant='contained' size='large' fullWidth sx={{
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