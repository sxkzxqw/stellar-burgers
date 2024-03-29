import React, { FC } from 'react';
import styles from './IngredientDetails.module.css';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../utils/types/hook';

const IngredientDetails: FC = () => {
    const params = useParams()
    const ingredients = useAppSelector(state => state.burgerIngredient.ingredients)
    const ingredient = ingredients.find(ingredient => ingredient._id === params.id)
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 className='text text_type_main-large'>Детали ингредиента</h2>
            </div>
            <img src={ingredient?.image_large} alt={ingredient?.name} className={styles.image} />
            <p className='text text_type_main-medium'>{ingredient?.name}</p>
            <ul className={styles.stats}>
                <div className={styles.stats__list}>
                    <li className='text text_type_main-default text_color_inactive'>Калории,ккал</li>
                    <li className='text text_type_digits-default text_color_inactive'>{ingredient?.calories}</li>
                </div>
                <div className={styles.stats__list}>
                    <li className='text text_type_main-default text_color_inactive'>Белки, г</li>
                    <li className='text text_type_digits-default text_color_inactive'>{ingredient?.proteins}</li>
                </div>
                <div className={styles.stats__list}>
                    <li className='text text_type_main-default text_color_inactive'>Жиры, г</li>
                    <li className='text text_type_digits-default text_color_inactive'>{ingredient?.fat}</li>
                </div>
                <div className={styles.stats__list}>
                    <li className='text text_type_main-default text_color_inactive'>Углеводы, г</li>
                    <li className='text text_type_digits-default text_color_inactive'>{ingredient?.carbohydrates}</li>
                </div>
            </ul>
        </div>
    );
};

export default IngredientDetails;