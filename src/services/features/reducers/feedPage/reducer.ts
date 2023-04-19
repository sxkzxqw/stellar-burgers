import { createReducer } from '@reduxjs/toolkit'
import { wsCloseFeed, wsConnectingFeed, wsErrorFeed, wsMessageFeed, wsOpenFeed } from './actions';

export type TOrder = {
    _id: string,
    ingredients: string[],
    status: string,
    name: string,
    createdAt: Date | string,
    updatedAt: Date,
    number: number
}

export type TOrderList = {
    success: boolean,
    orders: TOrder[],
    total: number,
    totalToday: number
}

type TOrderState = {
    data: TOrderList | null
}

const initialState: TOrderState = {
    data: null
}

export const feedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnectingFeed, (state) => {
        })
        .addCase(wsOpenFeed, (state) => {
            console.log('OPEN WEBSOCKET');
        })
        .addCase(wsCloseFeed, (state) => {
            console.log('CLOSE WEBSOCKET');
        })
        .addCase(wsErrorFeed, (state, action) => {
        })
        .addCase(wsMessageFeed, (state, action) => {
            console.log(action.payload);

            state.data = action.payload
        })
})