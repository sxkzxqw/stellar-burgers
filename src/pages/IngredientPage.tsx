import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styles from './pages.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../utils/types/hook';
import IngredientDetails from '../components/UI/IngredientDetails/IngredientDetails';

const IngredientPage = () => {
    const params = useParams();
    const ingredients = useAppSelector((state) => state.burgerIngredient.ingredients)
    const ingredient = ingredients.find(ingredient => ingredient._id === params.id)

    const isLoading = useAppSelector(state => state.burgerIngredient.isLoading)

    return (
        <section className={styles.ingredient_container}>
            {isLoading
                ? <h1>Loading...</h1>
                : <>  <IngredientDetails />
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