import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentIngredient } from '../../../services/features/selectors/burgerIngredientsselectors';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({handleClick}) => {
    const ingredient = useSelector(selectCurrentIngredient);
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 className='text text_type_main-large' style={{margin: 0}}>Детали ингредиента</h2>
                <button onClick={handleClick} className={styles.button}>
                    <CloseIcon type="primary" onClick={handleClick} />
                </button>
            </div>
            <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
            <p className='text text_type_main-medium' style={{textAlign: 'center'}}>{ingredient.name}</p>
            <ul className={styles.stats}>
                <div className={styles.stats__list}>
                    <li className='text text_type_main-default text_color_inactive'>Калории,ккал</li>
                    <li className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</li>
                </div>
                <div className={styles.stats__list}>
                    <li className='text text_type_main-default text_color_inactive'>Белки, г</li>
                    <li className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</li>
                </div>
                <div className={styles.stats__list}>
                    <li className='text text_type_main-default text_color_inactive'>Жиры, г</li>
                    <li className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</li>
                </div>
                <div className={styles.stats__list}>
                    <li className='text text_type_main-default text_color_inactive'>Углеводы, г</li>
                    <li className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</li>
                </div>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {
    handleClick: PropTypes.func
}

export default IngredientDetails;