import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RequireAuth = (props) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    if (auth?.username) {
        console.log("Logged in!");
    } else {
        console.log("Logged out!");
        navigate('/');
    }

    return (
        auth?.username ?
            <Outlet />
        : <></>
    );
}