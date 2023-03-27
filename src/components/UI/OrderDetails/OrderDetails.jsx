import React from 'react';
import styles from './OrderDetails.module.css';
import doneImg from '../../../images/done.jpg';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const OrderDetails = () => {
    const orderNumber = useSelector(state => state.order.orderIngredients)
    const loader = useSelector(state => state.order.isLoading)

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={`text text_type_digits-large mb-8 ${styles.digit__effect}`}>
                    {loader
                        ? 'Loading...'
                        : orderNumber.order.number
                    }
                </h2>
                <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                <img src={doneImg} className={styles.image} />
                <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитральной станции</p>
            </div>
        </div>
    );
};

export default OrderDetails;