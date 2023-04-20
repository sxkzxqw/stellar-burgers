import React, { FC } from 'react';
import styles from './OrderTemplate.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../../utils/types/hook'
import { dateFormat, dateWhen } from '../../../utils/date';
import { TOrderTemplate } from '../../../utils/types/types';
import { Link, useLocation } from 'react-router-dom';

function inNotUndefined<T>(item: T | undefined): item is T {
    return item !== undefined
};

const OrderTemplate: FC<TOrderTemplate> = ({ order }) => {
    const location = useLocation()
    const ingredients = useAppSelector(state => state.burgerIngredient.ingredients)
    const orderIngredientsForImage = ingredients.filter((ingredient) => order.ingredients.includes(ingredient._id))
    const orderIngredientsForTotal =
        order.ingredients.map(id => {
            return ingredients.find(item => item._id === id);
        }).filter(inNotUndefined);
    const totalOrderPrice = orderIngredientsForTotal.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    );
    const CurrentDate = dateWhen(new Date(order.createdAt))
    const dateFormatCurrent = order.createdAt.toString()
    return (
        <Link to={{ pathname: location.pathname === '/feed' ? `/feed/${order._id}` : `/profile/orders/${order._id}` }} state={{ background: location }} className={styles.link}>
            <li className={styles.container}>
                <div className={styles.number}>
                    <p className='text text_type_digits-default'>#{order?.number}</p>
                    <p className={styles.date}>{`${CurrentDate}, ${dateFormat(dateFormatCurrent)}`}</p>
                </div>
                <h3 className='text text_type_main-medium'>{order?.name}</h3>
                <div className={styles.bottom}>
                    <ul className={styles.images}>
                        {orderIngredientsForImage.map((image) => {
                            return <li className={styles.image__container} key={image._id}>
                                <img src={image.image_mobile} className={styles.image} alt={image.name} />
                            </li>
                        })}
                    </ul>
                    <div className={styles.price}>
                        <p className='text text_type_digits-default'>{totalOrderPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </li>
        </Link>
    );
};

export default OrderTemplate;