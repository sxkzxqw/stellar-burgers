import { userDataTest } from '../../utils/fakeData-for-test';
import {
    authCheck,
    checkUserAuth,
    loginUser,
    logoutUser,
    registerUser,
    resetPasswordEmail,
    resetPasswordNew,
    updateInfoUser,
    initialState
} from './UserSlice'
import userReducer from './UserSlice';

const rejectedTestData = {
    "message": "email or password are incorrect"
}

describe('user reducer', () => {
    it('check initial state', () => {
        expect(userReducer(undefined, { type: '' })).toEqual(initialState)
    });

    it('check authCheck action', () => {
        expect(userReducer(initialState, { type: authCheck.type })).toEqual({
            ...initialState,
            isAuthChecked: true
        });
    });

    it('check checkUserAuth fulfilled', () => {
        expect(
            userReducer(initialState, {
                payload: userDataTest,
                type: checkUserAuth.fulfilled.type
            })
        ).toEqual({
            ...initialState,
            data: userDataTest,
            getUserRequest: false
        });
    });

    it('check registerUser fulfilled', () => {
        expect(
            userReducer(initialState, {
                payload: userDataTest,
                type: registerUser.fulfilled.type
            })
        ).toEqual({
            ...initialState,
            data: userDataTest,
            registerUserRequest: false
        });
    });

    it('check loginUser fulfilled', () => {
        expect(
            userReducer(initialState, {
                payload: userDataTest,
                type: loginUser.fulfilled.type
            })
        ).toEqual({
            ...initialState,
            data: userDataTest,
            loginUserRequest: false
        });
    });

    it('check logoutUser fulfilled', () => {
        expect(
            userReducer(initialState, {
                payload: userDataTest,
                type: logoutUser.fulfilled.type
            })
        ).toEqual({
            ...initialState,
            data: null,
            logoutUserRequest: false
        });
    });

    it('check updateInfoUser fulfilled', () => {
        expect(
            userReducer(initialState, {
                payload: userDataTest,
                type: updateInfoUser.fulfilled.type
            })
        ).toEqual({
            ...initialState,
            data: userDataTest,
            updateInfoUserRequest: false
        });
    });

    it('check resetPasswordNew fulfilled', () => {
        expect(
            userReducer(initialState, {
                payload: userDataTest,
                type: resetPasswordNew.fulfilled.type
            })
        ).toEqual({
            ...initialState,
            resetPasswordNewRequest: false
        });
    });

    it('check resetPasswordEmail fulfilled', () => {
        expect(
            userReducer(initialState, {
                payload: userDataTest,
                type: resetPasswordNew.fulfilled.type
            })
        ).toEqual({
            ...initialState,
            resetPasswordEmailRequest: false
        });
    });

    // pending

    it('check checkUserAuth pending', () => {
        expect(
            userReducer(initialState, { type: checkUserAuth.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            checkUserAuthRequest: true,
            checkUserAuthError: null
        });
    });

    it('check registerUser pending', () => {
        expect(
            userReducer(initialState, { type: registerUser.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            registerUserRequest: true,
            registerUserError: null
        });
    });

    it('check loginUser pending', () => {
        expect(userReducer(initialState, { type: loginUser.pending.type })).toEqual(
            {
                ...initialState,
                data: null,
                loginUserRequest: true,
                loginUserError: null
            }
        );
    });

    it('check logoutUser pending', () => {
        expect(
            userReducer(initialState, { type: logoutUser.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            logoutUserRequest: true,
            logoutUserError: null
        });
    });

    it('check updateInfoUser pending', () => {
        expect(
            userReducer(initialState, { type: updateInfoUser.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            updateInfoUserRequest: true,
            updateInfoUserError: null
        });
    });
    it('check resetPasswordNew pending', () => {
        expect(
            userReducer(initialState, { type: resetPasswordNew.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            resetPasswordNewRequest: true,
            resetPasswordNewError: null
        });
    });

    it('check resetPasswordEmail pending', () => {
        expect(
            userReducer(initialState, { type: resetPasswordEmail.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            resetPasswordEmailRequest: true,
            resetPasswordEmailError: null
        });
    });

    // reject

    it('check checkUserAuth rejected', () => {
        expect(
            userReducer(initialState, {
                payload: rejectedTestData,
                type: checkUserAuth.rejected.type
            })
        ).toEqual({
            ...initialState,
            checkUserAuthRequest: false,
            checkUserAuthError: rejectedTestData
        });
    });

    it('check registerUser rejected', () => {
        expect(
            userReducer(initialState, { payload: rejectedTestData, type: registerUser.rejected.type })
        ).toEqual({
            ...initialState,
            registerUserRequest: false,
            registerUserError: rejectedTestData
        });
    });

    it('check loginUser rejected', () => {
        expect(
            userReducer(initialState, { payload: rejectedTestData, type: loginUser.rejected.type })
        ).toEqual({
            ...initialState,
            loginUserRequest: false,
            loginUserError: rejectedTestData
        });
    });

    it('check loginUser rejected', () => {
        expect(
            userReducer(initialState, { payload: rejectedTestData, type: loginUser.rejected.type })
        ).toEqual({
            ...initialState,
            loginUserRequest: false,
            loginUserError: rejectedTestData
        });
    });

    it('check updateInfoUser rejected', () => {
        expect(
            userReducer(initialState, { payload: rejectedTestData, type: updateInfoUser.rejected.type })
        ).toEqual({
            ...initialState,
            updateInfoUserRequest: false,
            updateInfoUserError: rejectedTestData
        });
    });

    it('check resetPasswordNew rejected', () => {
        expect(
            userReducer(initialState, { payload: rejectedTestData, type: resetPasswordNew.rejected.type })
        ).toEqual({
            ...initialState,
            resetPasswordNewRequest: false,
            resetPasswordNewError: rejectedTestData
        });
    });

    it('check resetPasswordEmail rejected', () => {
        expect(
            userReducer(initialState, { payload: rejectedTestData, type: resetPasswordEmail.rejected.type })
        ).toEqual({
            ...initialState,
            resetPasswordEmailRequest: false,
            resetPasswordEmailError: rejectedTestData
        });
    });
});