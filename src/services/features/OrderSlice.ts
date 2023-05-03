import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { BASE_URL, axiosInstance } from '../../API/Burgers';
import { getCookie } from '../../API/cookies';
import axios from 'axios'
import { ThunkAPI } from '../store';

type TState = {
    orderIngredients: null | string[],
    isLoading: boolean,
    serverResponse: null | {
        "success"?: boolean,
        "name"?: string,
        "order"?: {
            "number"?: number,
        }
    }
}

export const initialState: TState = {
    orderIngredients: null,
    isLoading: false,
    serverResponse: null
}

export const sendOrder = createAsyncThunk<any, string[], ThunkAPI>(
    'order/post',
    async (selectOrderDetails, { rejectWithValue, dispatch }) => {
        const res = await axios({
            url: `${BASE_URL}orders`,
            method: 'POST',
            headers: {
                authorization: getCookie('accessToken')
            },
            data: {
                'ingredients': selectOrderDetails
            }
        })
        return res.data;
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderDetails: (state, action: PayloadAction<string[]>) => {
            state.orderIngredients = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendOrder.fulfilled, (state, action: PayloadAction<object>) => {
            state.serverResponse = action.payload;
            state.isLoading = false;
        }).addCase(sendOrder.pending, (state) => {
            state.isLoading = true;
        }).addCase(sendOrder.rejected, (state) => {
            state.isLoading = false;
            alert('Ошибка запроса')
        })
    }
})

export const { setOrderDetails } = orderSlice.actions

export default orderSlice.reducer