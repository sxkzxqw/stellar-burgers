import { createSelector } from "@reduxjs/toolkit";
import { sliceName } from '../UserSlice.js';

export const selectBuns = (state) => state.burgerIngredient.ingredients?.filter(ingredient => ingredient.type === 'bun');

export const selectSauces = (state) => state.burgerIngredient.ingredients?.filter(ingredient => ingredient.type === 'sauce');

export const selectMains = (state) => state.burgerIngredient.ingredients?.filter(ingredient => ingredient.type === 'main');

export const isModalVisible = (state) => Boolean(state.burgerIngredient.currentIngredient);

export const selectCurrentIngredient = (state) => state.burgerIngredient.currentIngredient;

export const getUser = (state) => state[sliceName]?.data;

export const getIsAuthChecked = store => store[sliceName]?.isAuthChecked;