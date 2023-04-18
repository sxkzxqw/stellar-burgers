import { TIsActionPending } from "./types/types";

export function isActionPending(action: TIsActionPending): boolean {
    return action.type.endsWith('pending')
}

export function isActionRejected(action: TIsActionPending): boolean {
    return action.type.endsWith('rejected')
}

export function isActionSuccess(action: TIsActionPending): boolean {
    return action.type.endsWith('fulfilled')
}

export function getActionName(actionType: string): string {
    return actionType.split('/')[1];
}

export const WebsocketStatus = {
    CONNECTING: 'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export const LiveTableActionType = {
    DATA: 'data',
    INSERT: 'insert',
    DELETE: 'delete',
    UPDATE: 'update',
    MOVE: 'move',
}
