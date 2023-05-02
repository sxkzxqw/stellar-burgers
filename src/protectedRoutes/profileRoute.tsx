import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";
import { TProtectedRoute } from '../utils/types/types';
import { useAppSelector } from '../utils/types/hook';
import { getCookie } from '../API/cookies';

export const ProtectedRoute: FC<TProtectedRoute> = ({ onlyUnAuth, children }) => {
    const location = useLocation();
    const user = useAppSelector(state => state.rootReducer?.user.data)
    const isAuthChecked = useAppSelector(state => state.rootReducer?.user.isAuthChecked);
    const isLogged = getCookie('accessToken')

    if (!isAuthChecked) {
        return <h2>Loading...</h2>
    }

    if (onlyUnAuth && isLogged) {
        const { from } = location.state || { from: { pathname: '/' } }
        const { background } = location.state?.from?.state || { background: null };
        console.log('nav prof')
        return <Navigate replace to={from} state={{ background }} />;
    }

    if (!onlyUnAuth && !isLogged) {
        console.log('NAVIGATE LOGIN');
        return (
            <Navigate replace to={{ pathname: "/login" }
            } state={{ from: location }} />
        );
    }

    return children;
}
