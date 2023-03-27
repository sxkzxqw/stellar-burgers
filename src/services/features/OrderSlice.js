import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../API/Burgers';

const initialState = {
    orderIngredients: null,
    isLoading: false,
}

export const sendOrder = createAsyncThunk(
    'order/post',
    async (selectOrderDetails, { rejectWithValue, dispatch }) => {
        const res = await axiosInstance.post('orders', {
            'ingredients': selectOrderDetails
        })
        return res.data;
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderDetails: (state, action) => {
            state.orderIngredients = action.payload;
        },
    },
    extraReducers: {
        [sendOrder.fulfilled]: (state, action) => {
            state.orderIngredients = action.payload;
            state.isLoading = false;
        },
        [sendOrder.pending]: (state) => {
            state.isLoading = true;
        },
        [sendOrder.rejected]: (state) => {
            state.isLoading = false;
            alert('Ошибка запроса')
        }
    }
})

export const { setOrderDetails } = orderSlice.actions

export default orderSlice.reducer