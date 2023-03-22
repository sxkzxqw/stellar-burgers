import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './OrderDetails.module.css';
import doneImg from '../../../images/done.jpg';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const OrderDetails = ({handleClick}) => {
    const orderNumber = useSelector(state => state.order.orderIngredients)

    return (
        <div className={styles.container}>
            <button type='button' className={styles.button} onClick={handleClick}>
                <CloseIcon type='primary' />
            </button>
            <div className={styles.content}>
                <h2 className={`text text_type_digits-large mb-8 ${styles.digit__effect}`}>{orderNumber?.order?.number ?? 'Loading...'}</h2>
                <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                <img src={doneImg} style={{width: '120px', overflow: 'hidden', objectFit: 'none', height: '120px'}} />
                <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитральной станции</p>
            </div>
        </div>
    );
};

OrderDetails.propTypes = {
    handleClick: PropTypes.func
}

export default OrderDetails;