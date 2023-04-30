/* import { testOrder } from "../../utils/fakeData-for-test";
import { initialState, orderSlice, sendOrder } from "./OrderSlice";

describe('burgerOrderInfoSlice reducer', () => {
    it('should return initial state', () => {
        expect(orderSlice.reducer(initialState, { type: '' })).toEqual(
            initialState
        );
    });

    it('should hanlde sendOrder fulfilled', () => {
        expect(
            orderSlice.reducer(initialState, {
                payload: testOrder,
                type: sendOrder.fulfilled
            })
        ).toEqual({ ...initialState, serverResponse: testOrder, isLoading: false });
    });

    it('should return sendOrder pending', () => {
        expect(
            orderSlice.reducer(initialState, {
                payload: testOrder,
                type: sendOrder.pending
            })
        ).toEqual({ ...initialState, isLoading: true });
    });

    it('should return sendOrder rejected', () => {
        expect(
            orderSlice.reducer(initialState, {
                payload: testOrder,
                type: sendOrder.rejected
            })
        ).toEqual({ ...initialState, isLoading: false });
    });
}); */