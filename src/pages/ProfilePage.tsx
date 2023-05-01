import React, { useEffect } from 'react';
import styles from './pages.module.css';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser, updateInfoUser } from '../services/features/UserSlice';
import { getCookie } from '../API/cookies';
import { useAppDispatch, useAppSelector } from '../utils/types/hook';
import { wsConnectOrder, wsDisconnectOrder } from '../services/features/reducers/ordersPage/actions';
import { BURGER_API_WSS_ORDERS } from '../API/burger-api';

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(wsConnectOrder({ wsUrl: BURGER_API_WSS_ORDERS, withTokenRefresh: true }))
        return () => {
            dispatch(wsDisconnectOrder())
        }
    }, []);
    const mail = useAppSelector(state => state?.rootReducer?.user?.data?.email)
    const name = useAppSelector(state => state?.rootReducer?.user?.data?.name)
    const [value, setValue] = React.useState({
        name: name,
        email: mail,
        password: ''
    })
    const requestBodyChange = value

    const inactiveClassName = `${styles.link} ${styles.profilelink} text text_type_main-medium text_color_inactive`
    const activeClassName = `${styles.link} ${styles.profilelink} ${styles.active} text text_type_main-medium`
    const token = getCookie('refreshToken')
    const RequestBody = {
        'token': token
    }

    const logout = (RequestBody: any) => {
        dispatch(logoutUser(RequestBody))
    }

    const changeValue = (RequestBody: any) => {
        dispatch(updateInfoUser(RequestBody))
    }

    const cancelEdit = () => {
        setValue({
            name: name,
            email: mail,
            password: ''
        })
    }
    const isEditAvailable = Boolean(value.name !== name || value.email !== mail)
    return (
        <section className={styles.profile}>
            <nav className={styles.menu}>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? `${activeClassName}` : `${inactiveClassName}`
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
                <span className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</span>
            </nav>
            <form className={styles.container} onSubmit={(e) => {
                e.preventDefault();
                changeValue(requestBodyChange)
            }}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={(evt) => setValue({ ...value, name: evt.target.value })}
                    value={`${value.name}`}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    icon="EditIcon"
                />
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={(evt) => setValue({ ...value, email: evt.target.value })}
                    value={`${value.email}`}
                    name={'email'}
                    icon="EditIcon"
                    extraClass="mt-6"
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={(evt) => setValue({ ...value, password: evt.target.value })}
                    value={value.password}
                    name={'password'}
                    icon="EditIcon"
                    extraClass="mt-6"
                />
                <div className={`${styles.choice} mt-6`}>
                    <Button type="secondary" size="medium" htmlType="reset" extraClass="pr-7" onClick={cancelEdit}>Отмена</Button>
                    {isEditAvailable
                        ? <Button type="primary" size="medium" htmlType="submit">Сохранить</Button>
                        : <Button type="primary" size="medium" htmlType="submit" disabled>Сохранить</Button>
                    }
                </div>
            </form>
        </section >
    );
};

export default ProfilePage;