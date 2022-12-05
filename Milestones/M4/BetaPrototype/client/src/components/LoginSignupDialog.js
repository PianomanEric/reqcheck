import React, { useEffect, useState, useMemo } from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogTitle,
    FormGroup,
    FormControlLabel,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export default function LoginSignupDialog(props) {

    const { auth, setAuth } = useAuth();

    const [studentID, setStudentID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);

    const handleClose = () => {
        console.log("closing");
        if (props.onClose) {
            props.onClose();
        }
        setStudentID('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setTerms(false);
    }

    const handlePageChange = (pageName) => {
        if (props.onPageChange) {
            props.onPageChange(pageName);
        }
        setTerms(false);
    }

    const handleLogin = async () => {
        try{
            const response = await axios.post('api/auth/login', {
                email,
                password
            })
            if(response) {
                console.log(response.data);
                setAuth(response.data);
                console.log(auth);
                handleClose();
            }
        } catch(err) {
            console.log(err)
        }
        //setInputDisabled(false);
    }

    const handleSignup = async () => {
        try{
            const response = await axios.post('api/auth/register', {
                firstName,
                lastName,
                email,
                studentID,
                password
            })
            if(response) {
                console.log(response.data);
                handleClose();
            }
        } catch(err) {
            console.log(err)
        }
        //setInputDisabled(false);
    }

    return (
        <Dialog fullWidth maxWidth='xs' open={props.open} onClose={handleClose} PaperProps={{
            sx: {
                p: 3,
            }
        }}>

            <DialogTitle align='center'>
                {
                    props.page == 'Login' ? 'Login' : 'Create Your Account'
                }
            </DialogTitle>
            {
                (props.page == 'Login') ? 
                <>
                    <TextField size='small' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' type='email' sx={{mx: 2, my: 0.5}}/>
                    <TextField size='small' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type='password' sx={{mx: 2, my: 0.5}}/>

                    <Typography align='center' sx={{
                        mt: 2,
                    }}>
                        New to ReqCheck?
                    </Typography>

                    <Button onClick={() => {handlePageChange('Signup')}} sx={{
                        mb: 1,
                    }}>
                        Register an account!
                    </Button>

                    <DialogActions>
                        <Button onClick={handleLogin} disabled={inputDisabled} variant='contained' size='large' fullWidth sx={{
                            color: 'common.white',
                        }}>
                            Log In
                        </Button>
                    </DialogActions>
                </>:<>
                    <TextField size='small' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} placeholder='First Name' type='name' sx={{mx: 2, my: 0.5}}/>
                    <TextField size='small' value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder='Last Name' type='name' sx={{mx: 2, my: 0.5}}/>
                    <TextField size='small' value={studentID} onChange={(e) => {setStudentID(e.target.value)}} placeholder='Student ID' type='username' sx={{mx: 2, my: 0.5}}/>
                    <TextField size='small' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='SFSU Email' type='email' sx={{mx: 2, my: 0.5}}/>
                    <TextField size='small' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type='password' sx={{mx: 2, my: 0.5}}/>
                    <FormGroup sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        
                        <FormControlLabel control={<Checkbox checked={terms} onChange={(event) => {setTerms(event.target.checked)}}/>} label={<>
                            <Typography component='span'>
                                I agree to the terms and conditions
                            </Typography>
                        </>}/>
                    </FormGroup>

                    <Typography align='center' sx={{
                        mt: 2,
                    }}>
                        Already have an account?
                    </Typography>

                    <Button onClick={() => {handlePageChange('Login')}} sx={{
                        mb: 1,
                    }}>
                        Log in instead!
                    </Button>
                    <DialogActions>
                        <Button onClick={handleSignup} disabled={inputDisabled || !terms} variant='contained' size='large' fullWidth sx={{
                            color: 'common.white',
                        }}>
                            Create Account
                        </Button>
                    </DialogActions>
                </>
            }
        </Dialog>
    );
}