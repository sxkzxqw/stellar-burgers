export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        let reconnectTimer = 0;
        let isConnected = false;
        let wsUrl = 'wss://norma.nomoreparties.space/orders/all';
        return next => action => {
            const { dispatch } = store;
            // const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage } = wsActions;
            if (wsConnect.match(action)) {
                wsUrl = action.payload;
                socket = new WebSocket(`${wsUrl}`);
                isConnected = true;
                dispatch(wsConnecting())
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(wsOpen());
                };

                socket.onerror = event => {
                    console.log('socket.onerror', event);
                };

                socket.onclose = event => {
                    if (event.code !== 1000) {
                        console.log('socket.onclose error', event);
                        dispatch(wsError(event.code.toString()))
                    }

                    if (isConnected && event.code !== 1000) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(wsUrl))
                        }, 3000)
                    }
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(wsMessage(parsedData));
                };
            }

            if (wsDisconnect.match(action)) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close(1000, "Работа закончена")

                dispatch(wsClose());
            }

            next(action);
        };
    };
};