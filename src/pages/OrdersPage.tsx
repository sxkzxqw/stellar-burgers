import React from 'react';
import styles from './pages.module.css'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/types/hook';
import { getCookie } from '../API/cookies';
import { logoutUser } from '../services/features/UserSlice';
import OrderTemplate from '../components/UI/OrderTemplate/OrderTemplate';
import { TOrder } from '../services/features/reducers/feedPage/reducer';

const OrdersPage = () => {
    const dispatch = useAppDispatch()
    const inactiveClassName = `${styles.link} ${styles.profilelink} text text_type_main-medium text_color_inactive`
    const activeClassName = `${styles.link} ${styles.profilelink} ${styles.active} text text_type_main-medium`
    const token = getCookie('refreshToken')
    const RequestBody = {
        'token': token
    }

    const logout = (RequestBody: any) => {
        dispatch(logoutUser(RequestBody))
    }

    const orders = useAppSelector(state => state.rootReducer.orderPage.data?.orders)
    const location = useLocation()
    const isProfileActive = location.pathname == '/profile'
    const legnth: any = orders?.length
    return (
        <section className={styles.profile_orders}>
            <nav className={styles.menu_orders}>
                <NavLink
                    className={isProfileActive ? `${activeClassName}` : `${inactiveClassName}`}
                    to='/profile'
                >
                    Профиль
                </NavLink>
                <NavLink
                    to='/profile/orders'
                    className={({ isActive }) =>
                        isActive ? `${activeClassName}` : `${inactiveClassName}`
                    }
                >
                    История заказов
                </NavLink>
                <button
                    className={`${styles.button} text text_type_main-medium text_color_inactive`}
                    onClick={() => {
                        logout(RequestBody)
                    }}
                >
                    Выход
                </button>
                <span className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете просмотреть свою историю заказов</span>
            </nav>
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