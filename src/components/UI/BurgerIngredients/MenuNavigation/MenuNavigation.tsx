import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useState } from 'react';
import styles from './MenuNavigation.module.css';
import PropTypes from 'prop-types';
import { TMenuNavigation } from '../../../../utils/types/types';

const MenuNavigation: FC<TMenuNavigation> = ({ current, setCurrent }) => {


  const changeActiveIngredient = (id: string) => {
    setCurrent(id);
    document?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles.nav}>
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