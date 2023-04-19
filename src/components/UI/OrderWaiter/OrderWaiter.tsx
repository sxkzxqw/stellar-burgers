import React from 'react';
import styles from './OrderWaiter.module.css'
import { useAppSelector } from '../../../utils/types/hook';

const OrderWaiter = () => {
    const orders = useAppSelector(state => state.rootReducer.feedPage.data)
    const doneOrders = orders?.orders.filter((order) => order.status === 'done').slice(0, 30);
    const pendingOrders = orders?.orders.filter((order) => order.status === 'pending').slice(0, 30);
    return (
        <section className={styles.container}>
            <div className={styles.orders}>
                <div className={styles.inProgress}>
                    <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
                    <ul className={styles.inProgress_list}>
                        {doneOrders?.map((order) => {
                            return <li className={`${styles.done} text text_type_digits-default`}>{order.number}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.inProgress}>
                    <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                    <ul className={styles.inProgress_list}>
                        {pendingOrders?.map((order) => {
                            return <li className={`text text_type_digits-default`}>{order.number}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div className={styles.date_ready_list}>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className={`${styles.digit__effect} text text_type_digits-large`}>{orders?.total}</p>
            </div>
            <div className={styles.date_ready_list}>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className={`${styles.digit__effect} text text_type_digits-large`}>{orders?.totalToday}</p>
            </div>
        </section>
    );
};

export default OrderWaiter;