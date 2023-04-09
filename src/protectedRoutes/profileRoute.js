import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ onlyUnAuth, children }) => {
    const location = useLocation();
    const user = useSelector(state => state.rootReducer?.user.data)
    const isAuthChecked = useSelector(state => state.rootReducer?.user.isAuthChecked);

    if (!isAuthChecked) return <h2>Loading...</h2>

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } }
        const { background } = location.state?.from?.state || { background: null };
        console.log('nav prof')
        return <Navigate replace to={from} state={{ background }} />;
    }

    if (!onlyUnAuth && !user) {
        console.log('NAVIGATE LOGIN');
        return (
            <Navigate replace to={{ pathname: "/login" }} state={{ from: location }} />
        );
    }

    return children;

}
