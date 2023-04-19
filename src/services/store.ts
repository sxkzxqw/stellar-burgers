import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorSlice from "./features/BurgerConstructorSlice";
import burgerIngredientSlice from "./features/BurgerIngredientsSlice";
import orderSlice from "./features/OrderSlice";
import rootReducer from "./features";
import burgerApi, { BurgerApi } from '../API/burger-api';
import { socketMiddleware } from "./middleware/socket-middleware";
import { wsCloseFeed, wsConnectFeed, wsConnectingFeed, wsDisconnectFeed, wsErrorFeed, wsMessageFeed, wsOpenFeed } from "./features/reducers/feedPage/actions";
import { wsCloseOrder, wsConnectOrder, wsConnectingOrder, wsDisconnectOrder, wsErrorOrder, wsMessageOrder, wsOpenOrder } from "./features/reducers/ordersPage/actions";

const wsActionsFeed = {
    wsConnect: wsConnectFeed,
    wsDisconnect: wsDisconnectFeed,
    wsConnecting: wsConnectingFeed,
    wsOpen: wsOpenFeed,
    wsClose: wsCloseFeed,
    wsError: wsErrorFeed,
    wsMessage: wsMessageFeed
}

const wsActionsOrder = {
    wsConnect: wsConnectOrder,
    wsDisconnect: wsDisconnectOrder,
    wsConnecting: wsConnectingOrder,
    wsOpen: wsOpenOrder,
    wsClose: wsCloseOrder,
    wsError: wsErrorOrder,
    wsMessage: wsMessageOrder,
}

const websocketOrderMiddleware = socketMiddleware(wsActionsOrder);
const websocketFeedMiddleware = socketMiddleware(wsActionsFeed);

export const store = configureStore({
    reducer: {
        burgerIngredient: burgerIngredientSlice,
        burgerConstructor: burgerConstructorSlice,
        order: orderSlice,
        rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: burgerApi,
            },
        }).concat(websocketOrderMiddleware, websocketFeedMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type ThunkAPI = {
    dispatch: AppDispatch,
    extra: BurgerApi,
}