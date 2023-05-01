import { bunData, ingredientData } from "../../utils/fakeData-for-test";
import burgerIngredientSlice, { initialState, getIngredients } from "./BurgerIngredientsSlice";
describe('burgerIngredientSlice reducer', () => {
    it('should return initial state', () => {
        expect(burgerIngredientSlice(initialState, { type: '' })).toEqual(
            initialState
        );
    });

    it('check burgerIngredientSlice fulfilled', () => {
        expect(
            burgerIngredientSlice(initialState, {
                payload: [bunData, ingredientData],
                type: getIngredients.fulfilled
            })
        ).toEqual({
            ...initialState,
            data: [bunData, ingredientData],
            isLoading: false
        });
    });

    it('check burgerIngredientSlice pending', () => {
        expect(
            burgerIngredientSlice(initialState, {
                type: getIngredients.pending
            })
        ).toEqual({
            ...initialState,
            isLoading: true,
            error: null
        });
    });

    it('check burgerIngredientSlice rejected', () => {
        expect(
            burgerIngredientSlice(initialState, {
                payload: 'error',
                type: getIngredients.rejected
            })
        ).toEqual({
            ...initialState,
            isLoading: false,
            error: 'error'
        });
    });
});