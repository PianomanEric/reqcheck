import { modalUnstyledClasses } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, useLocation } from 'react-router-dom';

const AuthContext = createContext();

const getTokenFromCookie = () => {
    console.log(document.cookie);
}

const ROLES = {
    STUDENT: 1,
}

const getUserFromLocalStorage = () => {
    const storedUser = window.localStorage.getItem('user');
    if (storedUser != null) {
        return JSON.parse(storedUser);
    }
}

const authLoggedIn = (auth) => {
    return auth?.user != null;
}

const AuthProvider = (props) => {
    const location = useLocation();

    const [auth, setAuthPrivate] = useState(getUserFromLocalStorage());
    console.log('henlo', auth);

    const setAuth = (auth) => {
        setAuthPrivate(auth);
        const authStringified = auth ? JSON.stringify(auth) : null;
        window.localStorage.setItem('user', authStringified);
        console.log(authStringified);
        console.log(auth);
    }

    const hasRole = (roleList) => {
        console.log(auth);
        if (typeof(role) === 'array') {
            return auth?.roles?.find((role) => roleList?.includes(role)) || false;
        } else {
            return auth?.roles?.find((role) => roleList == role) || false;
        }
    }

    const logout = async () => {
        console.log('Removing the cookie!');
        const response = await axios.post('/api/auth/logout');
        setAuth();
        /*
        const expiredDate = new Date()
        expiredDate.setTime(0);
        const cookieStr = `jwt=; expires=${expiredDate.toUTCString()}; path=/;`;
        document.cookie = cookieStr;
        */
    }

    const login = async (formData) => {
        if (!formData || !formData.user || !formData.password) {
            return [false, 'Missing data'];
        }
        try{
            const response = await axios.post('/api/auth/login', formData)
            if(response) {
                if (authLoggedIn(response.data)) {
                    console.log(response.data);
                    setAuth(response.data);
                    return [true];
                } else {
                    console.log(response.data);
                    return [false, response.data];
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const signup = async (formData) => {
        if (!formData || !formData.user || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
            return [false, 'Missing data'];
        }
        try{
            const response = await axios.post('/api/auth/register', formData)
            if(response) {
                if (authLoggedIn(response.data)) {
                    console.log(response.data);
                    setAuth(response.data);
                    return [true];
                } else {
                    console.log(response.data);
                    return [false, response.data];
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const isLoggedIn = () => {
        return authLoggedIn(auth);
    }

    const verifyToken = () => {
        if (!auth) {
            return;
        }
        axios.post('/api/auth/verifyToken', {
            user: auth?.user,
        }).then((res) => {
            if (!res.data) {
                setAuth(undefined);
            }
        });
    }

    useEffect(() => {
        verifyToken();
    }, [location]);

    return (
        <AuthContext.Provider value={{ auth, logout, login, signup, hasRole, isLoggedIn, verifyToken, ROLES }}>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export { AuthContext, ROLES };