import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction('LIVE_TABLE_WS_CONNECT');
export const wsDisconnect = createAction('LIVE_TABLE_WS_DISCONNECT');
export const wsConnecting = createAction('LIVE_TABLE_WS_CONNECTING');
export const wsOpen = createAction('LIVE_TABLE_WS_OPEN');
export const wsClose = createAction('LIVE_TABLE_WS_CLOSE');
export const wsMessage = createAction('LIVE_TABLE_WS_MESSAGE');
export const wsError = createAction('LIVE_TABLE_WS_ERROR');
