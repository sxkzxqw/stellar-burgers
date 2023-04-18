import React from 'react';
import styles from './OrderWaiter.module.css'

const OrderWaiter = () => {
    return (
        <section className={styles.container}>
            <div className={styles.orders}>
                <div className={styles.inProgress}>
                    <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
                    <ul className={styles.inProgress_list}>
                        <li className={`${styles.done} text text_type_digits-default`}>034533</li>
                        <li className={`${styles.done} text text_type_digits-default`}>034533</li>
                        <li className={`${styles.done} text text_type_digits-default`}>034533</li>
                        <li className={`${styles.done} text text_type_digits-default`}>034533</li>
                        <li className={`${styles.done} text text_type_digits-default`}>034533</li>
                    </ul>
                </div>
                <div className={styles.inProgress}>
                    <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                    <ul className={styles.inProgress_list}>
                        <li className='text text_type_digits-default'>034533</li>
                        <li className='text text_type_digits-default'>034533</li>
                        <li className='text text_type_digits-default'>034533</li>
                        <li className='text text_type_digits-default'>034533</li>
                        <li className='text text_type_digits-default'>034533</li>
                    </ul>
                </div>
            </div>
            <div className={styles.date_ready_list}>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className={`${styles.digit__effect} text text_type_digits-large`}>28752</p>
            </div>
            <div className={styles.date_ready_list}>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className={`${styles.digit__effect} text text_type_digits-large`}>138</p>
            </div>
        </section>
    );
};

export default OrderWaiter;