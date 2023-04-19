import React, { useMemo } from 'react';
import styles from './OrderModal.module.css'
import { dateFormat, dateWhen } from '../../../utils/date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../utils/types/hook';

function inNotUndefined<T>(item: T | undefined): item is T {
    return item !== undefined
}
const OrderModal = () => {
    const ingredients = useAppSelector((state) => state.burgerIngredient.ingredients);
    const orders = useAppSelector((state) => state.rootReducer.feedPage.data?.orders);
    const { id } = useParams<{ id: string }>();
    const order = useMemo(() => {
        return orders?.find(order => order._id === id)
    }, [orders, id])

    const orderIngredientsForImage = ingredients.filter((ingredient) => order?.ingredients.includes(ingredient._id))

    const orderIngredients =
        order?.ingredients.map(id => {
            return ingredients.find(item => item._id === id);
        }).filter(inNotUndefined);

    const totalOrderPrice = orderIngredients?.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    );

    if (!order) {
        return null
    }

    const when = dateWhen(new Date(order.createdAt))

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
                                {orderIngredients?.filter(i => i._id === item._id).length} x {item.price} <CurrencyIcon type='primary' />
                            </p>
                        </li>
                    )}

            </ul>
            <div className={`${styles.total} mt-10 mb-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    {`${when}, ${dateFormat(order!.createdAt)}`}
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