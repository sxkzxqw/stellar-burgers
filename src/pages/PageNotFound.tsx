import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './pages.module.css'
import { Link, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <section className={styles.notFoundContent}>
            <h2 className={`${styles.titleNotFound} text text_type_main-large`}>Упс!<br /> Страница не найдена! 😕</h2>
            <Button size='large' type='primary' onClick={() => {
                navigate(-1)
            }} htmlType='button'>
                Вернуться назад &#8592;
            </Button>
        </section>
    );
};

export default PageNotFound;