import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorSlice from "./features/BurgerConstructorSlice";
import burgerIngredientSlice from "./features/BurgerIngredientsSlice";
import orderSlice from "./features/OrderSlice";
import rootReducer from "./features";
import burgerApi from '../API/burger-api';

export const store = configureStore({
    reducer: {
        burgerIngredient: burgerIngredientSlice,
        burgerConstructor: burgerConstructorSlice,
        order: orderSlice,
        rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: burgerApi,
            },
        }),
})