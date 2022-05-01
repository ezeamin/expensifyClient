import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { auth }= useAuth();

    return (
        auth ? <Outlet /> : <Navigate to="/auth/login" replace />
    );
};

export default RequireAuth;