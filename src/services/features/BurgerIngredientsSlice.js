import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../API/Burgers'
const initialState = {
    ingredients: [],
    currentIngredient: null
}

export const getIngredients = createAsyncThunk(
    'burgerIngredient/get',
    async (_, { rejectWithValue, dispatch }) => {
        const res = await axios.get(BASE_URL + 'ingredients');
        dispatch(setIngredients(res.data))
    }
)

export const burgerIngredientSlice = createSlice({
    name: 'burgerIngredient',
    initialState,
    reducers: {
        setIngredients: (state, action) => {
            state.ingredients = action.payload.data;
        },
        setCurrentIngredient: (state, action) => {
            state.currentIngredient = state.ingredients.find((ingredient) => ingredient._id === action.payload)
        },
        clearCurrentIngredient: (state, action) => {
            state.currentIngredient = null;
        }
    },
    extraReducers: {
        [getIngredients.fulfilled]: () => console.log('fulfiled'),
        [getIngredients.pending]: () => console.log('pending'),
        [getIngredients.rejected]: () => console.log('rejected')
    }
})

export const { setIngredients, setCurrentIngredient, clearCurrentIngredient } = burgerIngredientSlice.actions

export default burgerIngredientSlice.reducer