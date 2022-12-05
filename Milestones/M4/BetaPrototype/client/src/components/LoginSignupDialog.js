import React, { useRef, useState, } from 'react';
import {
    Alert,
    Button,
    Checkbox,
    Collapse,
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
    const [errorMessage, setErrorMessage] = useState();

    const firstNameBox = useRef();
    const lastNameBox = useRef();
    const idBox = useRef();
    const emailBox = useRef();
    const passwordBox = useRef();
    const loginButton = useRef();
    const signupButton = useRef();

    const clearForm = () => {
        setStudentID('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setTerms(false);
        setErrorMessage();
        setInputDisabled(false);
    }

    const handleClose = () => {
        console.log("closing");
        if (props.onClose) {
            props.onClose();
        }
        clearForm();
    }

    const handlePageChange = (pageName) => {
        if (props.onPageChange) {
            props.onPageChange(pageName);
        }
        setTerms(false);
        setErrorMessage();
    }

    const handleLogin = async () => {
        setInputDisabled(true);
        try{
            const response = await axios.post('api/auth/login', {
                email,
                password
            })
            if(response) {
                console.log(response.data);
                if (response.data?.username) {
                    console.log(response.data);
                    setAuth(response.data);
                    handleClose();
                } else {
                    setErrorMessage(response.data);
                }
            }
        } catch(err) {
            console.log(err)
        }
        loginButton.current.blur();
        setInputDisabled(false);
    }

    const handleSignup = async () => {
        setInputDisabled(true);
        try{
            const response = await axios.post('api/auth/register', {
                firstName,
                lastName,
                email,
                studentID,
                password
            })
            if(response) {
                if (response.data?.username) {
                    console.log(response.data);
                    setAuth(response.data);
                    handleClose();
                } else {
                    setErrorMessage(response.data);
                }
            }
        } catch(err) {
            console.log(err)
        }
        signupButton.current.blur();
        setInputDisabled(false);
    }

    const callOnEnterPress = (callback) => {
        return (e) => {
            if (e.key === 'Enter') {
                callback();
            }
        }
    }

    const focusOnEnterPress = (nextInputRef) => {
        return (e) => {
            if (e.key === 'Enter') {
                nextInputRef.current.focus();
            }
        }
    }

    return (
        <Dialog fullWidth maxWidth='xs' open={props.open} onClose={handleClose} PaperProps={{
            sx: {
                px: 5,
                py: 3,
            }
        }}>

            <DialogTitle align='center'>
                {
                    props.page == 'Login' ? 'Login' : 'Create Your Account'
                }
            </DialogTitle>
                {
                    (errorMessage) ? 
                        <Alert severity="error" sx={{my: 0.5}}>
                            {errorMessage}
                        </Alert>
                    : undefined
                }
                {
                (props.page == 'Login') ? 
                <>
                    <TextField inputRef={emailBox} onKeyDown={focusOnEnterPress(passwordBox)} autoFocus size='small' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' type='email' sx={{my: 0.5}}/>
                    <TextField inputRef={passwordBox} onKeyDown={focusOnEnterPress(loginButton)} size='small' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type='password' sx={{my: 0.5}}/>

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

                    <DialogActions sx={{p: 0}}>
                        <Button onClick={handleLogin} ref={loginButton} disabled={inputDisabled} variant='contained' size='large' fullWidth sx={{
                            color: 'common.white',
                        }}>
                            Log In
                        </Button>
                    </DialogActions>
                </>:<>
                    <TextField inputRef={firstNameBox} onKeyDown={focusOnEnterPress(lastNameBox)} size='small' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} placeholder='First Name' type='name' sx={{my: 0.5}}/>
                    <TextField inputRef={lastNameBox} onKeyDown={focusOnEnterPress(idBox)} size='small' value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder='Last Name' type='name' sx={{my: 0.5}}/>
                    <TextField inputRef={idBox} onKeyDown={focusOnEnterPress(emailBox)} size='small' value={studentID} onChange={(e) => {setStudentID(e.target.value)}} placeholder='Student ID' type='username' sx={{my: 0.5}}/>
                    <TextField inputRef={emailBox} onKeyDown={focusOnEnterPress(passwordBox)} size='small' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='SFSU Email' type='email' sx={{my: 0.5}}/>
                    <TextField inputRef={passwordBox} onKeyDown={focusOnEnterPress(signupButton)} size='small' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type='password' sx={{my: 0.5}}/>
                    <FormGroup sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        
                        <FormControlLabel control={<Checkbox checked={terms} onKeyDown={focusOnEnterPress(signupButton)} onChange={(event) => {setTerms(event.target.checked)}} />} label={<>
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
                    <DialogActions sx={{p: 0}}>
                        <Button onClick={handleSignup} ref={signupButton} disabled={inputDisabled || !terms} variant='contained' size='large' fullWidth sx={{
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