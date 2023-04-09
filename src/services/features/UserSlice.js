import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getActionName, isActionPending, isActionRejected, isActionSuccess } from '../../utils/action-utils.js';
import { deleteCookie, setCookie } from '../../API/cookies';
export const sliceName = 'user';
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

export const checkUserAuth = createAsyncThunk(`${sliceName}/checkUserAuth`,
    async (_, { extra: api, rejectWithValue, dispatch }) => {
        try {
            const data = await api.getUser();
            if (!data?.success) {
                return rejectWithValue(data)
            }
            return data.user;
        } catch (error) {
            return rejectWithValue(error);
        }
        finally {
            dispatch(authCheck())
        }

    }
);



export const registerUser = createAsyncThunk(`${sliceName}/registerUser`,
    async (dataUser, { extra: api, rejectWithValue }) => {
        const data = await api.registerUser(dataUser);
        console.log('responce', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        setCookie('accessToken', data.accessToken, { 'max-age': 1000 });
        setCookie('refreshToken', data.refreshToken)
        return data.user;
    }
);


export const loginUser = createAsyncThunk(`${sliceName}/loginUser`,
    async (dataUser, { extra: api, rejectWithValue }) => {
        const data = await api.loginUser(dataUser);
        console.log('responce', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken)
        return data.user;
    }
);

export const logoutUser = createAsyncThunk(`${sliceName}/logoutUser`,
    async (dataUser, { extra: api, rejectWithValue }) => {
        const data = await api.logoutUser(dataUser);
        console.log('responce', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        return data.user;
    }
);

export const updateInfoUser = createAsyncThunk(`${sliceName}/updateInfoUser`,
    async (dataUser, { extra: api, rejectWithValue }) => {
        const data = await api.updateInfoUser(dataUser);
        console.log('responce', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        return data.user;
    }
);

export const resetPasswordEmail = createAsyncThunk(`${sliceName}/resetPasswordEmail`,
    async (dataUser, { extra: api, rejectWithValue }) => {
        const data = await api.forgotPasswordEmail(dataUser);
        console.log('responce', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        return data;
    }
);

export const resetPasswordNew = createAsyncThunk(`${sliceName}/resetPasswordNew`,
    async (dataUser, { extra: api, rejectWithValue }) => {
        const data = await api.forgotPasswordNew(dataUser);
        console.log('responce', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        return data;
    }
);


const user = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        authCheck: (state) => {
            state.isAuthChecked = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.getUserRequest = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.registerUserRequest = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loginUserRequest = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.data = null
                state.logoutUserRequest = false;
            })
            .addCase(updateInfoUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.updateInfoUserRequest = false
            })
            .addCase(resetPasswordEmail.fulfilled, (state, action) => {
                state.resetPasswordEmailRequest = false
            })
            .addCase(resetPasswordNew.fulfilled, (state, action) => {
                state.resetPasswordNewRequest = false
            })
            .addMatcher(isActionPending, (state, action) => {
                state[`${getActionName(action.type)}Request`] = true;
                state[`${getActionName(action.type)}Error`] = null;
            })
            .addMatcher(isActionRejected, (state, action) => {
                state[`${getActionName(action.type)}Error`] = action.payload;
                state[`${getActionName(action.type)}Request`] = false;
            })
    }
})

export const { authCheck } = user.actions

export default user.reducer;
