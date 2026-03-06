import { Navigate, useSearchParams } from 'react-router-dom';
import { getUserRole } from '../services/authService';
import ClientDashboard from './dashboard/ClientDashboard';
import BusinessOwnerDashboard from './dashboard/BusinessOwnerDashboard';
import Layout from './common/Layout';

const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const view = searchParams.get('view') || 'overview';
    const role = getUserRole();

    if (!role) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout>
            {role === 'BUSINESS_OWNER' ? (
                <BusinessOwnerDashboard view={view} />
            ) : (
                <ClientDashboard view={view} />
            )}
        </Layout>
    );
};

export default Dashboard;
