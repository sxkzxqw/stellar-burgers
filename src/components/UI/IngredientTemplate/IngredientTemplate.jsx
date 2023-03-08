import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './IngredientTemplate.module.css';

const IngredientTemplate = ({ingredients, handleClick}) => {
    return (
        <li className={styles.ingredient__template} onClick={()=> {handleClick(ingredients)}}>
            <img className={styles.ingredient__image} src={ingredients.image} alt={ingredients.name} />
            <div className={styles.ingredient__price}>
                <p className="text text_type_digits-default">{ingredients.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className='text text_type_main-default' style={{height: '48px', textAlign: 'center'}}>
                {ingredients.name}
            </p>
        </li>
    );
};

export default IngredientTemplate;