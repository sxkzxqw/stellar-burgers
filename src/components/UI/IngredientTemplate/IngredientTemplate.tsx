import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useDrag } from 'react-dnd/dist/hooks';
import { selectCountState } from '../../../services/features/BurgerConstructorSlice';
import { setCurrentIngredient } from '../../../services/features/BurgerIngredientsSlice';
import styles from './IngredientTemplate.module.css';
import { Link, useLocation } from 'react-router-dom';
import { TTemplateIngredient } from '../../../utils/types/types';
import { useAppDispatch, useAppSelector } from '../../../utils/types/hook';

const IngredientTemplate: FC<TTemplateIngredient> = ({ ingredient }) => {
    const dispatch = useAppDispatch();
    const location = useLocation()
    const id = ingredient._id;
    const [{ isDrag }, drag, dragPreview] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const counter = useAppSelector((state) => selectCountState(state, id))
    return (
        <Link to={{ pathname: `ingredients/${ingredient._id}` }} state={{ background: location }} style={{ textDecoration: 'none', color: 'white' }} replace={true}>
            <li
                className={styles.ingredient__template} onClick={() => dispatch(setCurrentIngredient(ingredient._id))} ref={drag}>
                <img className={styles.ingredient__image} src={ingredient.image} alt={ingredient.name} />
                {counter != 0
                    ? <Counter count={counter} size='default' extraClass={styles.counter} />
                    : null
                }
                <div className={styles.ingredient__price}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <p className={`${styles.text_name} text text_type_main-default`}>
                    {ingredient.name}
                </p>
            </li>
        </Link>
    );
};

export default IngredientTemplate;