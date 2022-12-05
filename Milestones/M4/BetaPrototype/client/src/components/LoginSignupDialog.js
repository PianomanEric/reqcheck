import React, { useRef, useState, } from 'react';
import {
    Alert,
    Button,
    Checkbox,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    FormControlLabel,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { flexbox } from '@mui/system';

export default function LoginSignupDialog(props) {

    const { auth, setAuth } = useAuth();

    const [studentID, setStudentID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const firstNameBox = useRef();
    const lastNameBox = useRef();
    const idBox = useRef();
    const emailBox = useRef();
    const passwordBox = useRef();
    const loginButton = useRef();
    const signupButton = useRef();
    const termsCheckbox = useRef();


    const clearForm = () => {
        setStudentID('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setTerms(false);
        setErrorMessage();
        setLoading(false);
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
        setLoading(true);
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
        setLoading(false);
    }

    const handleSignup = async () => {
        setLoading(true);
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
        setLoading(false);
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
        <Dialog fullWidth maxWidth='xs' scroll='body' open={props.open} onClose={handleClose} PaperProps={{
            sx: {
                px: 2,
                py: 2,
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
                    <DialogContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TextField fullWidth inputRef={emailBox} onKeyDown={focusOnEnterPress(passwordBox)} autoFocus size='small' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' type='email' sx={{my: 0.5}}/>
                        <TextField fullWidth inputRef={passwordBox} onKeyDown={focusOnEnterPress(loginButton)} size='small' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type='password' sx={{my: 0.5}}/>

                        <Typography align='center' sx={{
                            mt: 2,
                        }}>
                            New to ReqCheck?
                        </Typography>

                        <Link component={RouterLink} onClick={() => {handlePageChange('Signup')}} sx={{
                            mx: 'auto',
                        }}>
                            Register an account!
                        </Link>

                    </DialogContent>
                    <DialogActions sx={{p: 0}}>
                        <LoadingButton loading={loading} onClick={handleLogin} ref={loginButton} disabled={loading} variant='contained' size='large' fullWidth sx={{
                            color: 'common.white',
                        }}>
                            Log In
                        </LoadingButton>
                    </DialogActions>
                </>:<>
                    <DialogContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TextField fullWidth inputRef={firstNameBox} onKeyDown={focusOnEnterPress(lastNameBox)} size='small' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} placeholder='First Name' type='name' sx={{my: 0.5}}/>
                        <TextField fullWidth inputRef={lastNameBox} onKeyDown={focusOnEnterPress(idBox)} size='small' value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder='Last Name' type='name' sx={{my: 0.5}}/>
                        <TextField fullWidth inputRef={idBox} onKeyDown={focusOnEnterPress(emailBox)} size='small' value={studentID} onChange={(e) => {setStudentID(e.target.value)}} placeholder='Student ID' type='username' sx={{my: 0.5}}/>
                        <TextField fullWidth inputRef={emailBox} onKeyDown={focusOnEnterPress(passwordBox)} size='small' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='SFSU Email' type='email' sx={{my: 0.5}}/>
                        <TextField fullWidth inputRef={passwordBox} onKeyDown={focusOnEnterPress(termsCheckbox)} size='small' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type='password' sx={{my: 0.5}}/>
                        <FormGroup sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            
                            <FormControlLabel control={<Checkbox checked={terms} inputRef={termsCheckbox} onKeyDown={focusOnEnterPress(signupButton)} onChange={(event) => {setTerms(event.target.checked)}} />} label={<>
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

                        <Link component={RouterLink} onClick={() => {handlePageChange('Login')}} sx={{
                            mx: 'auto',
                        }}>
                        Log in instead!
                        </Link>
                    </DialogContent>
                    <DialogActions sx={{p: 0}}>
                        <LoadingButton loading={loading} onClick={handleSignup} ref={signupButton} disabled={loading || !terms} variant='contained' size='large' fullWidth sx={{
                            color: 'common.white',
                        }}>
                            Create Account
                        </LoadingButton>
                    </DialogActions>
                </>
            }
        </Dialog>
    );
}