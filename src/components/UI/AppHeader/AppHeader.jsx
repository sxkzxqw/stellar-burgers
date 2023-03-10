import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import HeaderLinks from './HeaderLinks/HeaderLinks';
import styles from './AppHeader.module.css'

const AppHeader = () => {
    const [activePage, setActivePage] = useState('main')

    function pageIsActive(currentPage) {
        setActivePage(currentPage)
    }

    return (
        <header className={styles.header}>
            <nav className={styles.header__nav}>
                <ul className={styles.header__list}>
                    <li className={styles.header__items}>
                        <HeaderLinks 
                        handleClick={pageIsActive}
                        value="main"
                        active={activePage === 'main'}
                        text={'Конструктор'}
                        >
                            <BurgerIcon type={activePage === 'main' ? 'primary' : 'secondary'} />
                        </HeaderLinks>
                        <HeaderLinks 
                        handleClick={pageIsActive}
                        active={activePage === 'feed'}
                        value="feed"
                        text={'Лента заказов'}
                        >
                            <ListIcon type={activePage === 'feed'? 'primary' : 'secondary'} />
                        </HeaderLinks>
                    </li>
                    <Logo className={styles.header__logo} />
                    <li className={styles.header__account}>
                        <HeaderLinks 
                            handleClick={pageIsActive}
                            text={'Личный кабинет'}
                            active={activePage === 'personal'}
                            value="personal"
                        >
                            <ProfileIcon type={activePage === 'personal' ? 'primary' : 'secondary'} />

                            </HeaderLinks>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;