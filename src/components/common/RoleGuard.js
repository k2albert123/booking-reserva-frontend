import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, getCurrentUser } from '../../services/authService';

const RoleGuard = ({ children, allowedRoles }) => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const role = getUserRole();

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
            return;
        }
        if (!allowedRoles.includes(role)) {
            if (role === 'CLIENT' || role === 'BUSINESS_OWNER' || role === 'ADMIN') {
                navigate('/dashboard', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [user, role, allowedRoles, navigate]);

    if (!user || !allowedRoles.includes(role)) {
        return null;
    }

    return children;
};

export default RoleGuard;
