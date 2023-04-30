import { feedReducer } from './reducer';
import { initialState } from './reducer';
import { wsMessageFeed } from './actions';
import { feedPageTest } from '../../../../utils/fakeData-for-test';

describe('feed reducer', () => {
    it('should return initial state', () => {
        expect(feedReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should hanlde wsMessageFeed action', () => {
        expect(
            feedReducer(initialState, { type: wsMessageFeed.type, payload: feedPageTest })
        ).toEqual({
            ...initialState,
            data: feedPageTest
        });
    });
});
