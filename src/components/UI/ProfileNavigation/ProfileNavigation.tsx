import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/types/hook';
import { getCookie } from '../../../API/cookies';
import { logoutUser } from '../../../services/features/UserSlice';
import styles from './ProfileNavigation.module.css'

const ProfileNavigation = () => {
    const dispatch = useAppDispatch()
    const inactiveClassName = `${styles.link} ${styles.profilelink} text text_type_main-medium text_color_inactive`
    const activeClassName = `${styles.link} ${styles.profilelink} ${styles.active} text text_type_main-medium`
    const location = useLocation()
    const isProfileActive = location.pathname == '/profile'
    const token = getCookie('refreshToken')
    const RequestBody = {
        'token': token
    }

    const logout = (RequestBody: any) => {
        dispatch(logoutUser(RequestBody))
    }
    return (
        <nav className={isProfileActive ? `${styles.menu_orders_profile}` : `${styles.menu_orders}`}>
            <NavLink
                className={({ isActive }) =>
                    isProfileActive ? `${activeClassName}` : `${inactiveClassName}`
                }
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
    );
};

export default ProfileNavigation;