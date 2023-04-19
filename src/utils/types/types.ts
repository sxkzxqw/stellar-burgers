import { Dispatch, ReactNode, ReactElement } from "react"
import { TOrder } from "../../services/features/reducers/feedPage/reducer"

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
    uuid?: string | undefined,
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
    removeFunction: (uuid: string | undefined) => void,
    id: string | undefined,
    index?: number,
    isHover: boolean
}

export type TMenuNavigation = {
    current: string,
    setCurrent: Dispatch<string>,
}

export type TProtectedRoute = {
    onlyUnAuth?: any,
    children: ReactElement,
}

export type wsPayloadConnect = {
    wsUrl: string;
    withTokenRefresh: boolean
}

export type TOptionsDate = {
    timezone: 'Moscow',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: "short",
}

export type TOrderTemplate = {
    order: TOrder
}