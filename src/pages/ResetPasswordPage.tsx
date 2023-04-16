import React, { useState } from 'react';
import styles from './pages.module.css';
import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordNew } from '../services/features/UserSlice';
import { useAppDispatch } from '../utils/types/hook';

const ResetPasswordPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        password: '',
        token: '',
    })

    const requestBody = value
    const onSubmit = (requestBody: any) => {
        dispatch(resetPasswordNew(requestBody))
    }

    const isSendAvailable = Boolean(value.password.length > 5 && value.token.length > 3)
    return (
        <section className={styles.content}>
            <form className={styles.container} onSubmit={(e) => {
                e.preventDefault()
                onSubmit(requestBody)
            }}>
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                <Input
                    onChange={(evt) => setValue({ ...value, token: evt.target.value })}
                    value={value.token}
                    name={'emailCode'}
                    extraClass="mt-6"
                    placeholder='Введите код из почты'
                />
                <PasswordInput
                    onChange={(evt) => setValue({ ...value, password: evt.target.value })}
                    value={value.password}
                    name={'password'}
                    extraClass="mt-6"
                    placeholder='Введите новый пароль'
                />
                {isSendAvailable
                    ? <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6">Поменять пароль</Button>
                    : <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6" disabled>Поменять пароль</Button>
                }
                <div className={`${styles.chooseContainer} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                    <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
                </div>
            </form>
        </section>
    );
};

export default ResetPasswordPage;