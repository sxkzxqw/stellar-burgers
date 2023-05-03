import React, { useEffect } from 'react';
import OrderModal from '../components/UI/OrderModal/OrderModal';
import { useAppDispatch } from '../utils/types/hook';
import { wsConnectFeed, wsDisconnectFeed } from '../services/features/reducers/feedPage/actions';
import { BURGER_API_WSS_FEED } from '../API/burger-api';

const FeedOrderPageFromLink = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(wsConnectFeed({ wsUrl: BURGER_API_WSS_FEED, withTokenRefresh: false }))
        return () => {
            dispatch(wsDisconnectFeed())
        }
    }, []);
    return (
        <>
            <OrderModal />
        </>
    );
};

export default FeedOrderPageFromLink;