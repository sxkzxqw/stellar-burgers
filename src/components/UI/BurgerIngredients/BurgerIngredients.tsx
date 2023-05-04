import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useScrollbar } from '../../../hooks/use-scrollbar';
import { clearCurrentIngredient } from '../../../services/features/BurgerIngredientsSlice';
import IngredientTemplate from '../IngredientTemplate/IngredientTemplate';
import styles from './BurgerIngredients.module.css';
import MenuNavigation from './MenuNavigation/MenuNavigation';
import { isModalVisible, selectBuns, selectMains, selectSauces } from '../../../services/features/selectors/burgerIngredientsselectors';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/types/hook';
import { TIngredientType } from '../../../utils/types/types';
import Loader from '../Loader/Loader';

const BurgerIngredients = () => {

    const dispatch = useAppDispatch()
    const buns = useAppSelector(selectBuns)
    const sauces = useAppSelector(selectSauces)
    const mains = useAppSelector(selectMains)
    const isCurrentModalVisible = useAppSelector(isModalVisible)
    const navigate = useNavigate()

    const isLoading = useAppSelector(state => state.burgerIngredient.isLoading)

    function handleCloseModal() {
        dispatch(clearCurrentIngredient())
        navigate('/', { replace: true })
    }

    const hasScroll = buns.length > 0;
    const wrapper = useRef(null);

    useScrollbar(wrapper, hasScroll);

    const [current, setCurrent] = useState('bun');

    const [refBun, inViewBun] = useInView();
    const [refMain, inViewMain] = useInView();
    const [refSauce, inViewSauce] = useInView();

    useEffect(() => {
        if (inViewBun) {
            setCurrent('bun')
        } else if (inViewSauce) {
            setCurrent('sauce')
        } else if (inViewMain) {
            setCurrent('main')
        }

    }, [inViewBun, inViewSauce, inViewMain])


    return (
        <section className={styles.menu}>
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1>
            <MenuNavigation current={current} setCurrent={setCurrent} />
            {isLoading
                ? <Loader />
                : <div className={styles.menu__options} style={{ height: hasScroll ? '670px' : 'auto' }} ref={wrapper}>
                    <article id={'bun'} ref={refBun}>
                        <h2 className="text text_type_main-medium">Булки</h2>
                        <ul className={styles.menu__item}>
                            {buns.map((ingredient: TIngredientType) => {
                                return <IngredientTemplate ingredient={ingredient} key={ingredient._id} />;
                            })}
                        </ul>
                    </article>
                    <article id={'sauce'} ref={refSauce}>
                        <h2 className="text text_type_main-medium">Соусы</h2>
                        <ul className={styles.menu__item}>
                            {sauces.map((ingredient: TIngredientType) => {
                                return <IngredientTemplate ingredient={ingredient} key={ingredient._id} />;
                            })}
                        </ul>
                    </article>
                    <article id={'main'} ref={refMain}>
                        <h2 className="text text_type_main-medium">Начинки</h2>
                        <ul className={`${styles.menu__item} ${styles.menu__item_type_last}`}>
                            {mains.map((ingredient: TIngredientType) => {
                                return <IngredientTemplate ingredient={ingredient} key={ingredient._id} />;
                            })}
                        </ul>
                    </article>
                </div>
            }
        </section>
    );
};

export default BurgerIngredients;