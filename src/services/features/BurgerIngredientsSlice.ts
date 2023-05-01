import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { axiosInstance } from '../../API/Burgers'
import { TIngredientType } from '../../utils/types/types'

type TBurgerIngredientsSlice = {
    ingredients: Array<TIngredientType>,
    currentIngredient: TIngredientType | undefined | null,
    isLoading: boolean,
}

export const initialState: TBurgerIngredientsSlice = {
    ingredients: [],
    currentIngredient: null,
    isLoading: false,
}

export const getIngredients = createAsyncThunk(
    'burgerIngredient/get',
    async (_, { rejectWithValue, dispatch }) => {
        const res = await axiosInstance.get('ingredients');
        return res.data;
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
        clearCurrentIngredient: (state) => {
            state.currentIngredient = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.data;
                state.isLoading = false;
            }).addCase(getIngredients.pending, (state) => {
                state.isLoading = true;
            }).addCase(getIngredients.rejected, (state) => {
                state.isLoading = false;
                alert('Ошибка запроса')
            })
    }
})

export const { setIngredients, setCurrentIngredient, clearCurrentIngredient } = burgerIngredientSlice.actions

export default burgerIngredientSlice.reducer