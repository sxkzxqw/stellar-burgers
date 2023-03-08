import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import styles from './MenuNavigation.module.css';

const MenuNavigation = ({current, setCurrent}) => {


    const changeActiveIngredient = (id) => {
      setCurrent(id);
      document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div style={{ display: 'flex', marginTop: '20px' }}>
        <Tab value="bun" active={current === 'bun'} onClick={changeActiveIngredient}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={changeActiveIngredient}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={changeActiveIngredient}>
          Начинки
        </Tab>
      </div>
    );
};

export default MenuNavigation;