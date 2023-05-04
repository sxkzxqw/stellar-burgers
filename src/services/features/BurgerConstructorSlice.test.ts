import { bunData, ingredientData } from "../../utils/fakeData-for-test";
import burgerConstructorSlice, {
    addConstructorElement,
    initialState,
    removeConstructorElement,
    moveElement,
    clearElements
} from './BurgerConstructorSlice'

describe('user reducer', () => {
    it('check burgerConstructorSlice', () => {
        expect(
            burgerConstructorSlice(initialState, {
                type: addConstructorElement.type,
                payload: bunData
            })
        ).toEqual({ ...initialState, bun: bunData });
    });

    it('check burgerConstructorSlice ingredients with uuid', () => {
        expect(
            burgerConstructorSlice(initialState, {
                type: addConstructorElement.type,
                payload: ingredientData
            })
        ).toEqual({ ...initialState, ingredients: [{ ...ingredientData, uuid: expect.stringMatching('') }] });
    });

    it('check removeConstructorElement', () => {
        const id = 'id'
        const stateAndIngredients = { ...initialState, ingredients: [{ ...ingredientData, uuid: id }] }
        expect(
            burgerConstructorSlice(stateAndIngredients, {
                type: removeConstructorElement.type,
                payload: id
            })
        ).toEqual(initialState);
    });

    it('check moveElement (start < end)', () => {
        const expectedResult = [bunData, ingredientData];
        const ingredients = [ingredientData, bunData];
        expect(
            burgerConstructorSlice(
                { ...initialState, ingredients },
                {
                    type: moveElement.type,
                    payload: [0, 1]
                }
            )
        ).toEqual({ ...initialState, ingredients: expectedResult });
    });

    it('check moveElement (start === end)', () => {
        const ingredients = [ingredientData, bunData];
        expect(
            burgerConstructorSlice(
                { ...initialState, ingredients },
                {
                    type: moveElement.type,
                    payload: [1, 1]
                }
            )
        ).toEqual({ ...initialState, ingredients: ingredients });
    });
    it('check moveElement (start > end)', () => {
        const ingredients = [bunData, ingredientData];
        const expectedResult = [ingredientData, bunData];
        expect(
            burgerConstructorSlice(
                { ...initialState, ingredients },
                {
                    type: moveElement.type,
                    payload: [1, 0]
                }
            )
        ).toEqual({ ...initialState, ingredients: expectedResult });
    });
    it('check clear all elemnts', () => {
        expect(clearElements()).toEqual({
            payload: undefined,
            type: clearElements.type
        });
    });
});
