import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../API/Burgers';

const initialState = {
    orderIngredients: null,
}

export const sendOrder = createAsyncThunk(
    'order/post',
    async (selectOrderDetails, { rejectWithValue, dispatch }) => {
        const res = await axios.post(BASE_URL + 'orders', {
            'ingredients': selectOrderDetails
        })
        dispatch(setOrderDetails(res.data))
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
        [sendOrder.fulfilled]: () => console.log('fulfiled'),
        [sendOrder.pending]: () => console.log('pending'),
        [sendOrder.rejected]: () => console.log('rejected')
    }
})

export const { setOrderDetails } = orderSlice.actions

export default orderSlice.reducer