import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrag } from 'react-dnd/dist/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountState } from '../../../services/features/BurgerConstructorSlice';
import { setCurrentIngredient } from '../../../services/features/BurgerIngredientsSlice';
import styles from './IngredientTemplate.module.css';
import PropTypes from 'prop-types';
import { ingredientTemplatePropTypes } from '../../../utils/prop-types';
import { Link, useLocation } from 'react-router-dom';

const IngredientTemplate = ({ ingredient }) => {
    const dispatch = useDispatch();
    const location = useLocation()
    const id = ingredient._id;
    const { content } = ingredient
    const [{ isDrag }, drag, dragPreview] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const counter = useSelector((state) => selectCountState(state, id))
    return (
        <Link to={{ pathname: `ingredients/${ingredient._id}` }} state={{ background: location }} style={{ textDecoration: 'none', color: 'white' }} replace={true}>
            <li
                className={styles.ingredient__template} onClick={() => dispatch(setCurrentIngredient(ingredient._id))} ref={drag}>
                <img className={styles.ingredient__image} src={ingredient.image} alt={ingredient.name} />
                {counter != 0
                    ? <Counter count={counter} size='default' className={styles.counter} />
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

IngredientTemplate.propTypes = {
    ingredient: ingredientTemplatePropTypes.isRequired
}

export default IngredientTemplate;