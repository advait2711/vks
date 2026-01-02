import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authAPI } from '../utils/api';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('adminToken');

            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            try {
                await authAPI.verify();
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.2rem',
                color: 'var(--emerald-primary)'
            }}>
                Verifying authentication...
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/secured-admin2711" replace />;
};

export default ProtectedRoute;
