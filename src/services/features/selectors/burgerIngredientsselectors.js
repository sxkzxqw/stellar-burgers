import { createSelector } from "@reduxjs/toolkit";

export const selectBuns = (state) => state.burgerIngredient.ingredients?.filter(ingredient => ingredient.type === 'bun');

export const selectSauces = (state) => state.burgerIngredient.ingredients?.filter(ingredient => ingredient.type === 'sauce');

export const selectMains = (state) => state.burgerIngredient.ingredients?.filter(ingredient => ingredient.type === 'main');

export const isModalVisible = (state) => Boolean(state.burgerIngredient.currentIngredient);

export const selectCurrentIngredient = (state) => state.burgerIngredient.currentIngredient;