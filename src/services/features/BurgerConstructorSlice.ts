import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { TIngredientType } from '../../utils/types/types';
import { useAppSelector } from '../../utils/types/hook';
import { RootState } from '../store';

type TState = {
    bun: null | TIngredientType
    ingredients: Array<TIngredientType>
}

const initialState: TState = {
    bun: null,
    ingredients: [],
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addConstructorElement: (state, action) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload;
            } else if (action.payload.type === 'sauce' || action.payload.type === 'main') {
                state?.ingredients?.push({ ...action.payload, uuid: uuidv4() });
            }
        },
        removeConstructorElement: (state, action) => {
            state.ingredients = state?.ingredients?.filter((ingredient) => ingredient.uuid != action.payload)
        },
        moveElement: (state, action) => {
            let res: Array<TIngredientType> = []
            let start = action.payload[0]
            let end = action.payload[1]
            if (start === end) {
                return state
            } else if (start > end) {
                res = [
                    ...state?.ingredients?.slice(0, end),
                    state?.ingredients[start],
                    ...state?.ingredients?.slice(end, start),
                    ...state?.ingredients?.slice(start + 1)
                ];
            } else if (start < end) {
                res = [
                    ...state?.ingredients.slice(0, start),
                    ...state?.ingredients.slice(start + 1, end + 1),
                    state?.ingredients[start],
                    ...state?.ingredients.slice(end + 1)
                ]
            }
            return {
                bun: state.bun,
                ingredients: res
            }
        },
        clearElements: (state) => {
            state.bun = null
            state.ingredients = []
        }
    }
})

const buns = (state: RootState) => state.burgerConstructor.bun
const items = (state: RootState) => state.burgerConstructor.ingredients

export const selectCountState = createSelector(
    [items, buns, (items, id) => id],
    (items, buns, id) => {
        return [buns, ...items, buns]?.filter(ingredient => ingredient && ingredient._id === id).length;
    }
)

export const { addConstructorElement, removeConstructorElement, moveElement, clearElements } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;