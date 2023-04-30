import { userDataTest } from '../../utils/fakeData-for-test';
import {
    authCheck,
    checkUserAuth,
    loginUser,
    logoutUser,
    registerUser,
    resetPasswordEmail,
    resetPasswordNew,
    updateInfoUser
} from './UserSlice'
import userReducer from './UserSlice';

const initialState = {
    isAuthChecked: false,
    data: null,

    registerUserError: null,
    registerUserRequest: false,

    loginUserError: null,
    loginUserRequest: false,

    getUserError: null,
    getUserRequest: false,

    logoutUserError: null,
    logoutUserRequest: false,

    updateInfoUserError: null,
    updateInfoUserRequest: false,

    resetPasswordEmailError: null,
    resetPasswordEmailRequest: false,

    resetPasswordNewError: null,
    resetPasswordNewRequest: false,
}

describe('user reducer', () => {
    it('should return initial state', () => {
        expect(userReducer(undefined, { type: '' })).toEqual(initialState)
    });

    it('should hanlde authCheck action', () => {
        expect(userReducer(initialState, { type: authCheck.type })).toEqual({
            ...initialState,
            isAuthChecked: true
        });
    });

    it('should hanlde checkUserAuth fulfilled', () => {
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

    it('should hanlde registerUser fulfilled', () => {
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

    it('should hanlde loginUser fulfilled', () => {
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

    it('should hanlde logoutUser fulfilled', () => {
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

    it('should hanlde updateInfoUser fulfilled', () => {
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

    it('should hanlde resetPasswordNew fulfilled', () => {
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

    it('should hanlde resetPasswordEmail fulfilled', () => {
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

    it('should hanlde checkUserAuth pending', () => {
        expect(
            userReducer(initialState, { type: checkUserAuth.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            checkUserAuthRequest: true,
            checkUserAuthError: null
        });
    });

    it('should hanlde registerUser pending', () => {
        expect(
            userReducer(initialState, { type: registerUser.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            registerUserRequest: true,
            registerUserError: null
        });
    });

    it('should hanlde loginUser pending', () => {
        expect(userReducer(initialState, { type: loginUser.pending.type })).toEqual(
            {
                ...initialState,
                data: null,
                loginUserRequest: true,
                loginUserError: null
            }
        );
    });

    it('should hanlde logoutUser pending', () => {
        expect(
            userReducer(initialState, { type: logoutUser.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            logoutUserRequest: true,
            logoutUserError: null
        });
    });

    it('should hanlde updateInfoUser pending', () => {
        expect(
            userReducer(initialState, { type: updateInfoUser.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            updateInfoUserRequest: true,
            updateInfoUserError: null
        });
    });
    it('should hanlde resetPasswordNew pending', () => {
        expect(
            userReducer(initialState, { type: resetPasswordNew.pending.type })
        ).toEqual({
            ...initialState,
            data: null,
            resetPasswordNewRequest: true,
            resetPasswordNewError: null
        });
    });

    it('should hanlde resetPasswordEmail pending', () => {
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

    // it('should hanlde checkUserAuth rejected', () => {
    //   expect(
    //     userReducer(initialState, {
    //       payload: userDataTest,
    //       type: checkUserAuth.rejected.type
    //     })
    //   ).toEqual({
    //     ...initialState,
    //     checkUserAuthRequest: false,
    //     checkUserAuthError: userDataTest
    //   });
    // });

    // it('should hanlde checkUserAuth rejected', () => {
    //   expect(
    //     userReducer(initialState, { type: checkUserAuth.rejected.type })
    //   ).toEqual({
    //     ...initialState,
    //     data: null,
    //     checkUserAuthRequest: false,
    //     checkUserAuthError: undefined
    //   });
    // });

    // it('should hanlde checkUserAuth rejected', () => {
    //   expect(
    //     userReducer(initialState, { type: checkUserAuth.rejected.type })
    //   ).toEqual({
    //     ...initialState,
    //     data: null,
    //     checkUserAuthRequest: false,
    //     checkUserAuthError: undefined
    //   });
    // });

    // it('should hanlde checkUserAuth rejected', () => {
    //   expect(
    //     userReducer(initialState, { type: checkUserAuth.rejected.type })
    //   ).toEqual({
    //     ...initialState,
    //     data: null,
    //     checkUserAuthRequest: false,
    //     checkUserAuthError: undefined
    //   });
    // });

    // it('should hanlde checkUserAuth rejected', () => {
    //   expect(
    //     userReducer(initialState, { type: checkUserAuth.rejected.type })
    //   ).toEqual({
    //     ...initialState,
    //     data: null,
    //     checkUserAuthRequest: false,
    //     checkUserAuthError: undefined
    //   });
    // });

    // it('should hanlde checkUserAuth rejected', () => {
    //   expect(
    //     userReducer(initialState, { type: checkUserAuth.rejected.type })
    //   ).toEqual({
    //     ...initialState,
    //     data: null,
    //     checkUserAuthRequest: false,
    //     checkUserAuthError: undefined
    //   });
    // });

    // it('should hanlde checkUserAuth rejected', () => {
    //   expect(
    //     userReducer(initialState, { type: checkUserAuth.rejected.type })
    //   ).toEqual({
    //     ...initialState,
    //     data: null,
    //     checkUserAuthRequest: false,
    //     checkUserAuthError: undefined
    //   });
    // });
});