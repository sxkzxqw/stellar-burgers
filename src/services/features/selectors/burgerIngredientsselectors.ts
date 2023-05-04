import { createSelector } from "@reduxjs/toolkit";
import { sliceName } from '../UserSlice';
import { TIngredientType } from "../../../utils/types/types";
import { RootState } from "../../store";

export const selectBuns = (state: RootState) => state.burgerIngredient.ingredients?.filter((ingredient: TIngredientType) => ingredient.type === 'bun');

export const selectSauces = (state: RootState) => state.burgerIngredient.ingredients?.filter((ingredient: TIngredientType) => ingredient.type === 'sauce');

export const selectMains = (state: RootState) => state.burgerIngredient.ingredients?.filter((ingredient: TIngredientType) => ingredient.type === 'main');

export const isModalVisible = (state: RootState) => Boolean(state.burgerIngredient.currentIngredient);

export const selectCurrentIngredient = (state: RootState) => state.burgerIngredient.currentIngredient;

export const getUser = (state: RootState) => state.rootReducer[sliceName]?.data;

export const getIsAuthChecked = (store: RootState) => store.rootReducer[sliceName]?.isAuthChecked;