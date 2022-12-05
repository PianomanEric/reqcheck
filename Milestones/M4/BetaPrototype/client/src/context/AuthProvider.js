import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const getTokenFromCookie = () => {
    console.log(document.cookie);
}

export const AuthProvider = (props) => {
    const [auth, setAuthPrivate] = useState(getTokenFromCookie());

    const setAuth = (auth) => {
        setAuthPrivate(auth);
        const authStringified = auth ? JSON.stringify(auth) : null;
        window.localStorage.setItem('user', authStringified);
    }

    useEffect(() => {
        const storedUser = window.localStorage.getItem('user');
        console.log(typeof(storedUser));
        if (storedUser !== undefined) {
            setAuthPrivate(JSON.parse(storedUser));
        }
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthContext;