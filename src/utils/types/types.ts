import { ReactNode } from "react"

export type TIngredientType = {
    __v: number,
    _id: string,
    name: string,
    price: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    image: string,
    image_mobile: string,
    image_large: string,
    type: string,
    id?: string,
    uuid?: string,
}

export type TTemplateIngredient = {
    ingredient: TIngredientType
}

export type TIngredientDetails = {
    name?: string,
    image_large?: string,
    calories?: number,
    proteins?: number,
    fat?: number,
    carbohydrates?: number
}

export type TUser = {
    success: boolean,
    user: {
        name: string,
        email: string,
    }
}

export type TModal = {
    handleClick: () => void,
    children: ReactNode
}

export type TModalOverlay = {
    handleClick?: () => void,
    children: ReactNode
}

export type TDnDContainer = {
    children: ReactNode
}

export type THeaderLinks = {
    children: ReactNode,
    text: string,
    path: string
}

export type TIsActionPending = {
    type: string,
    payload: any
}

export type TConstructorElementTemplate = {
    ingredient: TIngredientType,
    removeFunction: () => void,
    id: string,
    index: number,
    isHover: boolean
}

export type TMenuNavigation = {
    current: string,
    setCurrent: () => string,
}

export type TProtectedRoute = {
    children: ReactNode
    onlyUnAuth?: any,
}