import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import HeaderLinks from './HeaderLinks/HeaderLinks';
import styles from './AppHeader.module.css'
import { Link, useMatch } from 'react-router-dom'

const AppHeader = () => {
    const isMain = useMatch('/')
    const isFeed = useMatch('/feed')
    const isLogin = !isMain && !isFeed

    return (
        <header className={styles.header}>
            <nav className={styles.header__nav}>
                <ul className={styles.header__list}>
                    <li className={styles.header__items}>
                        <HeaderLinks
                            text={'Конструктор'}
                            path={'/'}
                        >
                            <BurgerIcon type={isMain ? 'primary' : 'secondary'} />
                        </HeaderLinks>
                        <HeaderLinks
                            text={'Лента заказов'}
                            path={'/feed'}
                        >
                            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
                        </HeaderLinks>
                    </li>
                    <Link to='/'>
                        <Logo />
                    </Link>
                    <li className={styles.header__account}>
                        <HeaderLinks
                            text={'Личный кабинет'}
                            path={'/profile'}
                        >
                            <ProfileIcon type={isLogin ? 'primary' : 'secondary'} />
                        </HeaderLinks>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;