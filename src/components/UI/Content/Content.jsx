import React from 'react';
import BurgerConstructor from '../BurgerConstructor/BurgetConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './Content.module.css';

const Content = ({ingredients}) => {
    return (
        <main className={styles.content}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
        </main>
    );
};

export default Content;