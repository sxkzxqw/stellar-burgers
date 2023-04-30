import { bunData, ingredientData } from "../../utils/fakeData-for-test";
import burgerConstructorSlice, {
    addConstructorElement,
    initialState,
    removeConstructorElement,
    moveElement,
    clearElements
} from './BurgerConstructorSlice'

describe('user reducer', () => {
    it('should hanlde burgerConstructorSlice', () => {
        expect(
            burgerConstructorSlice(initialState, {
                type: addConstructorElement.type,
                payload: bunData
            })
        ).toEqual({ ...initialState, bun: bunData });
    });

    /*     it('should hanlde burgerConstructorSlice else', () => {
            expect(
                burgerConstructorSlice(initialState, {
                    type: addConstructorElement.type,
                    payload: ingredientData
                })
            ).toEqual({ ...initialState, ingredients: [ingredientData] });
        }); */

    it('should hanlde removeConstructorElement', () => {
        expect(removeConstructorElement(initialState)).toEqual({
            payload: {
                bun: null,
                ingredients: []
            },
            type: 'burgerConstructor/removeConstructorElement'
        });
    });

    it('should hanlde moveElement (start < end)', () => {
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

    it('should hanlde moveElement (start === end)', () => {
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
    it('should hanlde moveElement (start > end)', () => {
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
    /*     it('should hanlde clear all elemnts', () => {
            expect(clearElements(initialState)).toEqual({
                payload: {
                    bun: null,
                    ingredients: []
                },
                type: clearElements.type
            });
        }); */
});
