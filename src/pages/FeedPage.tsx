import React, { useEffect } from 'react';
import styles from './pages.module.css'
import OrderFeed from '../components/UI/OrderFeed/OrderFeed';
import OrderWaiter from '../components/UI/OrderWaiter/OrderWaiter';
import { useAppDispatch } from '../utils/types/hook';
import { wsConnectFeed, wsDisconnectFeed } from '../services/features/reducers/feedPage/actions';
import { BURGER_API_WSS_FEED } from '../API/burger-api';

const FeedPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(wsConnectFeed({ wsUrl: BURGER_API_WSS_FEED, withTokenRefresh: false }))
        return () => {
            dispatch(wsDisconnectFeed())
        }
    }, []);
    return (
        <main className={styles.BigPageContent}>
            <OrderFeed />
            <OrderWaiter />
        </main>
    );
};

export default FeedPage;