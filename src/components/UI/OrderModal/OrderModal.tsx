import React, { useEffect, useMemo } from 'react';
import styles from './OrderModal.module.css'
import { dateFormat, dateWhen } from '../../../utils/date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../utils/types/hook';
import { TIngredientType } from '../../../utils/types/types';

function inNotUndefined<T>(item: T | undefined): item is T {
    return item !== undefined
}

type TOrder = {
    _id: string,
    ingredients: string[],
    status: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    number: number
}

const OrderModal = () => {
    const location = useLocation()
    const pathname = location.pathname
    const newPathname = pathname.toString()

    const ingredients = useAppSelector((state) => state.burgerIngredient.ingredients);
    const ordersFeed = useAppSelector((state) => state.rootReducer.feedPage.data?.orders);
    const ordersProfile = useAppSelector(state => state.rootReducer.orderPage.data?.orders)
    let orders: TOrder[] | undefined
    if (newPathname.includes('/profile')) {
        orders = ordersProfile
    } else {
        orders = ordersFeed
    }
    const { id } = useParams<{ id: string }>();
    const order: TOrder | undefined = useMemo(() => {
        return orders?.find((order: TOrder) => order._id === id)
    }, [orders, id])

    const orderIngredientsForImage = ingredients.filter((ingredient) => order?.ingredients.includes(ingredient._id))

    const orderIngredients =
        order?.ingredients.map((id: string) => {
            return ingredients.find(item => item._id === id);
        }).filter(inNotUndefined);

    const totalOrderPrice: number | undefined = orderIngredients?.reduce(
        (acc: number, ingredient: TIngredientType) => acc + ingredient.price,
        0
    );

    if (!order) {
        return null
    }

    const when = dateWhen(new Date(order.createdAt))
    const currentDate = order!.createdAt.toString()

    return (
        <div className={styles.order_info}>
            <p className='text text_type_digits-default'>#{order?.number}</p>
            <p className={`${styles.title} text text_type_main-medium mt-10`}>{order?.name}</p>
            <p className={`${styles.status} text text_type_main-default mt-3`}>{order?.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
            <h3 className={`${styles.title} text text_type_main-medium mt-15`}>Состав:</h3>
            <ul className={`${styles.list} custom-scroll`}>
                {orderIngredientsForImage!
                    .map((item) =>
                        <li className={styles.item} key={item._id}>
                            <div className={styles.image_container}>
                                <img className={styles.image} src={item.image_mobile} alt={item.name} />
                                <p className={`${styles.text} text_type_main-default`}>{item.name}</p>
                            </div>
                            <p className={`${styles.price} text text_type_digits-default`}>
                                {orderIngredients?.filter((i: TIngredientType) => i._id === item._id).length} x {item.price} <CurrencyIcon type='primary' />
                            </p>
                        </li>
                    )}

            </ul>
            <div className={`${styles.total} mt-10 mb-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    {`${when}, ${dateFormat(currentDate)}`}
                </p>
                <div className={`${styles.total_price} mt-1 mb-2`}>
                    <p className="text text_type_digits-default">{totalOrderPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
};

export default OrderModal;