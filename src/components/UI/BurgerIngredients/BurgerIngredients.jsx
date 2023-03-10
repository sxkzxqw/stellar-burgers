import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useScrollbar } from '../../../hooks/use-scrollbar';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientTemplate from '../IngredientTemplate/IngredientTemplate';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './BurgerIngredients.module.css';
import MenuNavigation from './MenuNavigation/MenuNavigation';

const BurgerIngredients = ({ ingredients }) => {

    let buns = [];
    let sauces = [];
    let mains = [];

    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].type === 'bun') {
            buns.push(ingredients[i]);
        } else if (ingredients[i].type === 'sauce') {
            sauces.push(ingredients[i]);
        } else if (ingredients[i].type === 'main') {
            mains.push(ingredients[i]);
        }
    }

    function handleCloseModal(){
        setCurrentIngredient(null)
    }

    function setIngredientsState (state) {
        setCurrentIngredient(state)
    }

    const [currentIngredient, setCurrentIngredient] = useState(null);

    const hasScroll = buns.length > 0;
    const wrapper = useRef(null);

    useScrollbar(wrapper, hasScroll);


    const [current, setCurrent] = useState('bun');

    const [ refBun, inViewBun ] = useInView();
    const [ refMain, inViewMain ] = useInView();
    const [ refSauce, inViewSauce ] = useInView();
    
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
                            return <IngredientTemplate handleClick={setIngredientsState} ingredients={ingredient} key={ingredient._id} />;
                        })}
                    </ul>
                </article>
                <article id={'sauce'} ref={refSauce}>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ul className={styles.menu__item}>
                        {sauces.map((ingredient) => {
                            return <IngredientTemplate handleClick={setIngredientsState} ingredients={ingredient} key={ingredient._id} />;
                        })}
                    </ul>
                </article>
                <article id={'main'} ref={refMain}>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <ul className={styles.menu__item} style={{ marginBottom: 0 }}>
                        {mains.map((ingredient) => {
                            return <IngredientTemplate handleClick={setIngredientsState} ingredients={ingredient} key={ingredient._id} />;
                        })}
                    </ul>
                </article>
                <>
                    {!!currentIngredient && 
                    <div>
                        <ModalOverlay handleClick={handleCloseModal}>
                        </ModalOverlay>
                        <Modal handleClick={handleCloseModal}>
                            {<IngredientDetails ingredient={currentIngredient} handleClick={handleCloseModal} />}
                        </Modal>
                    </div>
                    }
                </>
            </div>
        </section>
    );
};

export default BurgerIngredients;