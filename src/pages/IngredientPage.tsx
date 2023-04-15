import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styles from './pages.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../utils/types/hook';

const IngredientPage = () => {
    const params = useParams();
    const ingredients = useAppSelector((state) => state.burgerIngredient.ingredients)
    const ingredient = ingredients.find(ingredient => ingredient._id === params.id)

    const isLoading = useAppSelector(state => state.burgerIngredient.isLoading)

    return (
        <section className={styles.ingredient_container}>
            {isLoading
                ? <h1>Loading...</h1>
                : <>  <div className={styles.title}>
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
                    <Link to='/'>
                        <Button size='large' type='primary' onClick={() => { }} htmlType='button'>
                            Вернуться в главное меню
                        </Button>
                    </Link>
                </>
            }
        </section>
    );
};

export default IngredientPage;