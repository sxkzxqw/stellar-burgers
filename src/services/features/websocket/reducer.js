import { WebsocketStatus } from '../../../utils/action-utils';
import { createReducer } from '@reduxjs/toolkit'
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions';
import { liveTableUpdate } from './live-table-update';
const initialState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    table: []
}

export const liveTableReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = '';
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload;
        })
        .addCase(wsMessage, (state, action) => {
            state.table = liveTableUpdate(state.table, action.payload);
        })
})