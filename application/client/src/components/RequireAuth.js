import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth, hasRole } = useAuth();

    const allowed = hasRole(allowedRoles);

    return (
        allowed ?
            <Outlet />
        : <Navigate to='/' replace={true} />
    );
}

export default RequireAuth;