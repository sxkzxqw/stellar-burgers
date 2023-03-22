import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useScrollbar } from '../../../hooks/use-scrollbar';
import { clearCurrentIngredient, getIngredients, setCurrentIngredient } from '../../../services/features/BurgerIngredientsSlice';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientTemplate from '../IngredientTemplate/IngredientTemplate';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './BurgerIngredients.module.css';
import MenuNavigation from './MenuNavigation/MenuNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { isModalVisible, selectBuns, selectMains, selectSauces } from '../../../services/features/selectors/burgerIngredientsselectors';

const BurgerIngredients = () => {

    const dispatch = useDispatch()

    const buns = useSelector(selectBuns)
    const sauces = useSelector(selectSauces)
    const mains = useSelector(selectMains)
    const isCurrentModalVisible = useSelector(isModalVisible)

    useEffect(function () {
        dispatch(getIngredients())
    }, [dispatch])

    function handleCloseModal() {
        dispatch(clearCurrentIngredient())
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
            <div className={styles.menu__options} style={{ height: hasScroll ? '670px' : 'auto' }} ref={wrapper}>
                <article id={'bun'} ref={refBun}>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <ul className={styles.menu__item}>
                        {buns.map((ingredient) => {
                            return <IngredientTemplate ingredient={ingredient} key={ingredient._id} />;
                        })}
                    </ul>
                </article>
                <article id={'sauce'} ref={refSauce}>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ul className={styles.menu__item}>
                        {sauces.map((ingredient) => {
                            return <IngredientTemplate ingredient={ingredient} key={ingredient._id} />;
                        })}
                    </ul>
                </article>
                <article id={'main'} ref={refMain}>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <ul className={styles.menu__item}>
                        {mains.map((ingredient) => {
                            return <IngredientTemplate ingredient={ingredient} key={ingredient._id} />;
                        })}
                    </ul>
                </article>
                {isCurrentModalVisible &&
                    <div>
                        <Modal handleClick={handleCloseModal}>
                            {<IngredientDetails />}
                        </Modal>
                    </div>
                }
            </div>
        </section>
    );
};

export default BurgerIngredients;