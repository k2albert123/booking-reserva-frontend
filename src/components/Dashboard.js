import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../services/authService';
import ClientDashboard from './dashboard/ClientDashboard';
import BusinessOwnerDashboard from './dashboard/BusinessOwnerDashboard';
import Layout from './common/Layout';

const Dashboard = () => {
    const role = getUserRole();

    if (!role) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout>
            {role === 'BUSINESS_OWNER' ? (
                <BusinessOwnerDashboard />
            ) : (
                <ClientDashboard />
            )}
        </Layout>
    );
};

export default Dashboard;
