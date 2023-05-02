import React, { useEffect } from 'react';
import styles from './pages.module.css'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/types/hook';
import { getCookie } from '../API/cookies';
import { logoutUser } from '../services/features/UserSlice';
import OrderTemplate from '../components/UI/OrderTemplate/OrderTemplate';
import { TOrder } from '../services/features/reducers/feedPage/reducer';
import { wsConnectOrder, wsDisconnectOrder } from '../services/features/reducers/ordersPage/actions';
import { BURGER_API_WSS_ORDERS } from '../API/burger-api';
import ProfileNavigation from '../components/UI/ProfileNavigation/ProfileNavigation';

const OrdersPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(wsConnectOrder({ wsUrl: BURGER_API_WSS_ORDERS, withTokenRefresh: true }))
        return () => {
            dispatch(wsDisconnectOrder())
        }
    }, []);
    const inactiveClassName = `${styles.link} ${styles.profilelink} text text_type_main-medium text_color_inactive`
    const activeClassName = `${styles.link} ${styles.profilelink} ${styles.active} text text_type_main-medium`
    const token = getCookie('refreshToken')
    const RequestBody = {
        'token': token
    }

    const logout = (RequestBody: any) => {
        dispatch(logoutUser(RequestBody))
    }

    let ordersStore = useAppSelector(state => state.rootReducer.orderPage.data?.orders)
    function reverseArr(input: any) {
        var ret = new Array;
        for (var i = input?.length - 1; i >= 0; i--) {
            ret.push(input[i]);
        }
        return ret;
    }
    const orders = reverseArr(ordersStore)
    const location = useLocation()
    const isProfileActive = location.pathname == '/profile'
    const legnth: any = orders?.length
    return (
        <section className={styles.profile_orders}>
            <ProfileNavigation />
            {legnth > 0
                ? <ul className={`${styles.orderFeed} custom-scroll`}>
                    {orders?.map((order: TOrder) => {
                        return <OrderTemplate order={order} key={order?._id} />
                    })}
                </ul>
                : <h2 className={`text text_type_digits-medium ${styles.digit__effect} ${styles.orderTitle}`}>У вас еще нет заказов</h2>
            }
        </section>
    );
};

export default OrdersPage;