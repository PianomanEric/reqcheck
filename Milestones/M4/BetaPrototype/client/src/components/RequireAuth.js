import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RequireAuth = (props) => {
    const { auth } = useAuth();

    if (auth?.username) {
        console.log("Logged in!");
    } else {
        console.log("Logged out!");
    }

    return (
        auth?.username ?
            <Outlet />
        : <></>
    );
}