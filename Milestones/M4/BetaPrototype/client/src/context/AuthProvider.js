import { modalUnstyledClasses } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

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

const AuthProvider = (props) => {
    const [auth, setAuthPrivate] = useState(getUserFromLocalStorage());

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

    const isLoggedIn = () => {
        return auth?.studentID ? true : false;
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, hasRole, isLoggedIn, ROLES }}>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export { AuthContext, ROLES };