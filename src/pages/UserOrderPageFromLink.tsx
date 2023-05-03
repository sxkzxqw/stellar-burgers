import React, { useEffect } from 'react';
import { BURGER_API_WSS_ORDERS } from '../API/burger-api';
import { wsConnectOrder, wsDisconnectOrder } from '../services/features/reducers/ordersPage/actions';
import { useAppDispatch } from '../utils/types/hook';
import { ProtectedRoute } from '../protectedRoutes/profileRoute';
import OrderModal from '../components/UI/OrderModal/OrderModal';

const UserOrderPageFromLink = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(wsConnectOrder({ wsUrl: BURGER_API_WSS_ORDERS, withTokenRefresh: true }))
        return () => {
            dispatch(wsDisconnectOrder())
        }
    }, []);
    return (
        <ProtectedRoute>
            <OrderModal />
        </ProtectedRoute>
    );
};

export default UserOrderPageFromLink;