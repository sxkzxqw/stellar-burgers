import React from 'react';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import DragAndDropContainer from '../DragAndDropContainer/DragAndDropContainer';
import styles from './Content.module.css';

const Content = () => {
    return (
        <main className={styles.content}>
            <DragAndDropContainer>
                <BurgerIngredients />
                <BurgerConstructor />
            </DragAndDropContainer>
        </main>
    );
};

export default Content;