import React, { useState } from 'react';
import styles from './pages.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/features/UserSlice';
import { useAppDispatch, useAppSelector } from '../utils/types/hook';

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        email: '',
        password: ''
    })

    const isLoginAvailable = Boolean(value.email.includes('@') && value.password.length > 5);
    const isUserLoginnedSuccessfully = useAppSelector(state => state?.rootReducer?.user?.data)
    const onClickLogin = (data: any) => {
        dispatch(loginUser(data))
        if (isUserLoginnedSuccessfully) {
            navigate('/profile')
        }
        setValue({
            email: '',
            password: '',
        })
    }

    const isLoading = useAppSelector((state) => state?.rootReducer?.user?.loginUserRequest)
    const isError = useAppSelector((state) => state?.rootReducer?.user?.loginUserError)

    return (
        <section className={styles.content}>
            {isError !== null &&
                <h2 className={`text text_type_digits mb-8 ${styles.digit__effect}`}>Ошибка! Пожалуйста, попробуйте заново.</h2>
            }
            {
                isLoading
                    ? <h2 className={`text text_type_digits-large mb-8 ${styles.digit__effect}`}>Loading...</h2>
                    : <form className={styles.container}>
                        <h2 className="text text_type_main-medium">Вход</h2>
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
                        {isLoginAvailable
                            ? <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6" onClick={() => {
                                onClickLogin(value);
                            }}>Войти</Button>
                            : <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6" disabled={true}>Войти</Button>
                        }
                        <div className={`${styles.chooseContainer} mt-20`}>
                            <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
                            <Link to='/register' className={`${styles.link} text text_type_main-default`}>Зарегистрироваться</Link>
                        </div>
                        <div className={`${styles.chooseContainer} mt-4`}>
                            <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                            <Link to='/forgot-password' className={`${styles.link} text text_type_main-default`}>Восстановить пароль</Link>
                        </div>
                    </form>
            }
        </section >
    );
};

export default LoginPage;