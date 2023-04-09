import React, { useState, useRef } from 'react';
import styles from './pages.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/features/UserSlice';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState({
        email: '',
        password: '',
        name: '',
    })

    const registerCallBack = (value) => {
        dispatch(registerUser(value))
        setValue({
            email: '',
            password: '',
            name: '',
        })
    }
    const isRegisterAvailabe = Boolean(value?.email.includes('@') && value.password.length > 5 && value.name !== '')
    return (
        <section className={styles.content}>
            <form className={styles.container}>
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={(evt) => setValue({ ...value, name: evt.target.value })}
                    value={value.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <EmailInput
                    onChange={(evt) => setValue({ ...value, email: evt.target.value })}
                    value={value.email}
                    name={'email'}
                    extraClass="mt-6"
                />
                <PasswordInput
                    onChange={(evt) => setValue({ ...value, password: evt.target.value })}
                    value={value.password}
                    name={'password'}
                    icon="ShowIcon"
                    extraClass="mt-6"
                />
                {isRegisterAvailabe
                    ? <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6" onClick={() => { registerCallBack(value) }}>Зарегистрироваться</Button>
                    : <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6" onClick={() => { registerCallBack(value) }} disabled={true}>Зарегистрироваться</Button>
                }
                <div className={`${styles.chooseContainer} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                    <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
                </div>
            </form>
        </section>
    );
};

export default RegisterPage;