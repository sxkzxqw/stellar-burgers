import { testOrder } from "../../utils/fakeData-for-test";
import { initialState, orderSlice, sendOrder } from "./OrderSlice";

describe('burgerOrderInfoSlice reducer', () => {
    it('check initial state', () => {
        expect(orderSlice.reducer(initialState, { type: '' })).toEqual(
            initialState
        );
    });

    it('check sendOrder fulfilled', () => {
        expect(
            orderSlice.reducer(initialState, {
                payload: testOrder,
                type: sendOrder.fulfilled
            })
        ).toEqual({ ...initialState, serverResponse: testOrder, isLoading: false });
    });

    it('check sendOrder pending', () => {
        expect(
            orderSlice.reducer(initialState, {
                payload: testOrder,
                type: sendOrder.pending
            })
        ).toEqual({ ...initialState, isLoading: true });
    });

    it('check sendOrder rejected', () => {
        expect(
            orderSlice.reducer(initialState, {
                payload: testOrder,
                type: sendOrder.rejected
            })
        ).toEqual({ ...initialState, isLoading: false });
    });
}); 