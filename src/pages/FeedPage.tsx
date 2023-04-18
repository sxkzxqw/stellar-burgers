import React from 'react';
import styles from './pages.module.css'
import OrderFeed from '../components/UI/OrderFeed/OrderFeed';
import OrderWaiter from '../components/UI/OrderWaiter/OrderWaiter';

const FeedPage = () => {
    return (
        <main className={styles.BigPageContent}>
            <OrderFeed />
            <OrderWaiter />
        </main>
    );
};

export default FeedPage;