import React from 'react';
import styles from './OrderFeed.module.css'
import OrderTemplate from '../OrderTemplate/OrderTemplate';

const OrderFeed = () => {
    return (
        <section className={styles.container}>
            <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
            <ul className={`${styles.orderFeed} custom-scroll`}>
                <OrderTemplate />
                <OrderTemplate />
                <OrderTemplate />
                <OrderTemplate />
                <OrderTemplate />
                <OrderTemplate />
            </ul>
        </section>
    );
};

export default OrderFeed;