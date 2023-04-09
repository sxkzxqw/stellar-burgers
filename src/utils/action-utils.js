export const renderLoading = (isLoading = false) => {
    const currentActiveButton = document.querySelector('.popup_is-opened .popup__button');
    if (isLoading) {
        currentActiveButton.textContent = 'Загрузка...';
        return;
    }

    currentActiveButton.textContent = 'Сохранить';
};

export function isActionPending(action) {
    return action.type.endsWith('pending')
}

export function isActionRejected(action) {
    return action.type.endsWith('rejected')
}

export function isActionSuccess(action) {
    return action.type.endsWith('fulfilled')
}


export function getActionName(actionType) {
    return actionType.split('/')[1];
}