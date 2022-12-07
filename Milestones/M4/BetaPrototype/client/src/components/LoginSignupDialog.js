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

const studentIDFormat = /^\d{9}$/;
const emailFormat = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const nameFormat = /^[a-zA-Z '-]+$/;

const validateID = (studentID) => {
    if (studentIDFormat.test(studentID)) {
        return [true];
    } else {
        return [false, 'in'];
    }
}

export default function LoginSignupDialog(props) {

    const { auth, login, signup } = useAuth();

    const [studentID, setStudentID] = useState('');
    const [studentIDError, setStudentIDError] = useState();
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState();
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState();
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

    const clearValidation = () => {
        setEmailError();
        setPasswordError();
        setStudentIDError();
        setFirstNameError();
        setLastNameError();
    }

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
        clearValidation();
    }

    const handlePageChange = (pageName) => {
        if (props.onPageChange) {
            props.onPageChange(pageName);
        }
        setTerms(false);
        setErrorMessage();
        clearValidation();
        console.log(emailError);
    }

    const handleLogin = async () => {
        if (studentIDError || passwordError) {
            return;
        }
        if (!studentID || !password) {
            if (!studentID) {
                setStudentIDError('Student ID required');
            }
            if (!password) {
                setPasswordError('Password required');
            }
            return;
        }
        setLoading(true);
        const [result, message] = await login({
            user: studentID,
            password: password,
        });
        if (!result) {
            setErrorMessage(message);
        } else {
            handleClose();
        }
        loginButton.current.blur();
        setLoading(false);
    }

    const handleSignup = async () => {
        if (studentIDError || passwordError || firstNameError || lastNameError || emailError) {
            return;
        }
        if (!studentID || !password || !firstName || !lastName || !email) {
            if (!studentID) {
                setStudentIDError('Student ID required');
            }
            if (!password) {
                setPasswordError('Password required');
            }
            if (!firstName) {
                setFirstNameError('First name required');
            }
            if (!lastName) {
                setLastNameError('Last name required');
            }
            if (!email) {
                setEmailError('Email required');
            }
            return;
        }
        setLoading(true);
        const [result, message] = await signup({
            user: studentID,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
        });
        if (!result) {
            setErrorMessage(message);
        } else {
            handleClose();
        }
        signupButton.current.blur();
        setLoading(false);
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
                        <TextField autoComplete='username' fullWidth onBlur={(e) => {setStudentIDError((studentID !== '' && !studentIDFormat.test(studentID)) ? 'Invalid student ID' : null)}} helperText={studentIDError} inputRef={idBox} error={studentIDError != null} onKeyDown={focusOnEnterPress(passwordBox)} autoFocus size='small' value={studentID} onChange={(e) => {setStudentID(e.target.value)}} placeholder='Student ID' type='text' sx={{my: 0.5}}/>
                        <TextField autoComplete='current-password' onBlur={(e) => {setPasswordError(null)}} fullWidth inputRef={passwordBox} onKeyDown={focusOnEnterPress(loginButton)} size='small' value={password} onChange={(e) => {setPassword(e.target.value)}} error={passwordError != null} helperText={passwordError} placeholder='Password' type='password' sx={{my: 0.5}}/>

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
                        <TextField autoComplete='given-name' fullWidth onBlur={(e) => {setFirstNameError((firstName !== '' && !nameFormat.test(firstName)) ? 'First name can only contain letters, spaces, hyphens, or apostrophes.' : null)}} error={firstNameError != null} helperText={firstNameError} inputRef={firstNameBox} onKeyDown={focusOnEnterPress(lastNameBox)} size='small' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} placeholder='First Name' type='text' sx={{my: 0.5}}/>
                        <TextField autoComplete='family-name' fullWidth onBlur={(e) => {setLastNameError((lastName !== '' && !nameFormat.test(lastName)) ? 'Last name can only contain letters, spaces, hyphens, or apostrophes.' : null)}} error={lastNameError != null} helperText={lastNameError} inputRef={lastNameBox} onKeyDown={focusOnEnterPress(idBox)} size='small' value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder='Last Name' type='text' sx={{my: 0.5}}/>
                        <TextField autoComplete='username' fullWidth onBlur={(e) => {setStudentIDError((studentID !== '' && !studentIDFormat.test(studentID)) ? 'Student ID must be 9 digits' : null)}} inputRef={idBox} error={studentIDError != null} helperText={studentIDError} onKeyDown={focusOnEnterPress(emailBox)} size='small' value={studentID} onChange={(e) => {setStudentID(e.target.value)}} placeholder='Student ID' type='text' sx={{my: 0.5}}/>
                        <TextField autoComplete='email' fullWidth onBlur={(e) => {setEmailError((email !== '' && !emailFormat.test(email)) ? 'Invalid email' : null)}} error={emailError != null} helperText={emailError} inputRef={emailBox} onKeyDown={focusOnEnterPress(passwordBox)} size='small' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='SFSU Email' type='email' sx={{my: 0.5}}/>
                        <TextField autoComplete='new-password' fullWidth onBlur={(e) => {setPasswordError((password !== '' && !passwordFormat.test(password)) ? <>Password must be 8 or more characters and contain:<br />- 1 or more lowercase letters<br />- 1 or more uppercase letters<br />- 1 or more numbers<br />- 1 or more special characters</> : null)}} error={passwordError != null} helperText={passwordError} inputRef={passwordBox} onKeyDown={focusOnEnterPress(termsCheckbox)} size='small' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type='password' sx={{my: 0.5}}/>
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