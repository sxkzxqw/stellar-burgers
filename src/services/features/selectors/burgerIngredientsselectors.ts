import { createSelector } from "@reduxjs/toolkit";
import { sliceName } from '../UserSlice';
import { TIngredientType } from "../../../utils/types/types";

export const selectBuns = (state: any) => state.burgerIngredient.ingredients?.filter((ingredient: TIngredientType) => ingredient.type === 'bun');

export const selectSauces = (state: any) => state.burgerIngredient.ingredients?.filter((ingredient: TIngredientType) => ingredient.type === 'sauce');

export const selectMains = (state: any) => state.burgerIngredient.ingredients?.filter((ingredient: TIngredientType) => ingredient.type === 'main');

export const isModalVisible = (state: any) => Boolean(state.burgerIngredient.currentIngredient);

export const selectCurrentIngredient = (state: any) => state.burgerIngredient.currentIngredient;

export const getUser = (state: any) => state[sliceName]?.data;

export const getIsAuthChecked = (store: any) => store[sliceName]?.isAuthChecked;