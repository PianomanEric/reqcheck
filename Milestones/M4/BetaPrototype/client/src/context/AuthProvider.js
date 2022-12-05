import { createContext, useState } from 'react';

const AuthContext = createContext();

const getTokenFromCookie = () => {
    console.log(document.cookie);
}

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState(getTokenFromCookie());

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthContext;