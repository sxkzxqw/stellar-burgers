import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorSlice from "./features/BurgerConstructorSlice";
import burgerIngredientSlice from "./features/BurgerIngredientsSlice";
import orderSlice from "./features/OrderSlice";

export const store = configureStore({
    reducer: {
        burgerIngredient: burgerIngredientSlice,
        burgerConstructor: burgerConstructorSlice,
        order: orderSlice
    },
})