import { ordersReducer } from './reducer';
import { initialState } from './reducer';
import { wsMessageOrder } from './actions';
import { orderPageTestData } from '../../../../utils/fakeData-for-test';

describe('feed reducer', () => {
    it('should return initial state', () => {
        expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should hanlde wsMessageFeed action', () => {
        expect(
            ordersReducer(initialState, {
                type: wsMessageOrder.type,
                payload: orderPageTestData
            })
        ).toEqual({
            ...initialState,
            data: orderPageTestData
        });
    });
});
