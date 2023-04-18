import React from 'react';
import styles from './OrderTemplate.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderTemplate = () => {
    const today = new Date();
    return (
        <li className={styles.container}>
            <div className={styles.number}>
                <p className='text text_type_digits-default'>#034535</p>
                <FormattedDate
                    className={styles.date}
                    date={
                        new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate(),
                            today.getHours(),
                            today.getMinutes() - 1,
                        )
                    }
                />
            </div>
            <h3 className='text text_type_main-medium'>Interstellar бургер</h3>
            <div className={styles.bottom}>
                <div className={styles.images}>
                    <div className={`${styles.image__container} ${styles.image__container_first}`}>
                        <img src='https://code.s3.yandex.net/react/code/sauce-03-mobile.png' className={styles.image} />
                    </div>
                    <div className={styles.image__container}>
                        <img src='https://code.s3.yandex.net/react/code/sauce-03-mobile.png' className={styles.image} />
                    </div>
                    <div className={styles.image__container}>
                        <img src='https://code.s3.yandex.net/react/code/sauce-03-mobile.png' className={styles.image} />
                    </div>
                    <div className={styles.image__container}>
                        <img src='https://code.s3.yandex.net/react/code/sauce-03-mobile.png' className={styles.image} />
                    </div>
                    <div className={styles.image__container}>
                        <img src='https://code.s3.yandex.net/react/code/sauce-03-mobile.png' className={styles.image} />
                    </div>
                </div>
                <div className={styles.price}>
                    <p className='text text_type_digits-default'>43243</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </li>
    );
};

export default OrderTemplate;