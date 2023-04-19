import React, { useRef } from 'react';
import styles from './OrderFeed.module.css'
import OrderTemplate from '../OrderTemplate/OrderTemplate';
import { useAppSelector } from '../../../utils/types/hook';
import { TOrder } from '../../../services/features/reducers/feedPage/reducer';
import { useScrollbar } from '../../../hooks/use-scrollbar';

const OrderFeed = () => {
    const orders = useAppSelector(state => state.rootReducer.feedPage.data?.orders)
    return (
        <section className={styles.container}>
            <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
            <ul className={`${styles.orderFeed} custom-scroll`}>
                {orders?.map((order: TOrder) => {
                    return <OrderTemplate order={order} key={order?._id} />
                })}
            </ul>
        </section>
    );
};

export default OrderFeed;