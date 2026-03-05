import { useNavigate } from 'react-router-dom';
import { getUserRole, getCurrentUser } from '../../services/authService';

const RoleGuard = ({ children, allowedRoles }) => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const role = getUserRole();
    
    if (!user) {
        navigate('/login', { replace: true });
        return null;
    }

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(role)) {
        // Redirect based on user's role
        if (role === 'CLIENT' || role === 'BUSINESS_OWNER') {
            navigate('/dashboard', { replace: true });
        } else {
            navigate('/', { replace: true });
        }
        return null;
    }

    return children;
};

export default RoleGuard;
