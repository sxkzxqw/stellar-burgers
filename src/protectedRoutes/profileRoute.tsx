import React, { FC } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { TProtectedRoute } from '../utils/types/types';
import { useAppSelector } from '../utils/types/hook';
import { getCookie } from '../API/cookies';
import Loader from '../components/UI/Loader/Loader';

export const ProtectedRoute: FC<TProtectedRoute> = ({ onlyUnAuth, children }) => {
    const location = useLocation();
    const isAuthChecked = useAppSelector(state => state.rootReducer?.user.isAuthChecked);
    const isLogged = getCookie('accessToken')
    const user = useAppSelector(state => state.rootReducer?.user.data)

    if (!isAuthChecked) {
        return <Loader />
    }

    if (onlyUnAuth && user) {
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
