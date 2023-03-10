import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
const modalRoot = document.getElementById('modal');

const BurgerConstructor = ({ ingredients }) => {
    let buns = [];
    let others = [];

    const [modal, setModal] = useState(null);

    function handleCloseModal() {
        setModal(null)
    }

    function setModalState(state) {
        setModal(state)
    }

    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].type === 'bun') {
            buns.push(ingredients[i]);
        } else if (ingredients[i].type === 'sauce' || ingredients[i].type === 'main') {
            others.push(ingredients[i]);
        }
    }

    buns.pop();

    return (
        <section className={styles.basket}>
            <div className={styles.buns}>
                {buns.map((ingredient) => {
                    return <ConstructorElement
                        key={ingredient._id}
                        type='top'
                        isLocked={true}
                        text={`${ingredient.name} (вверх)`}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />;
                })}
            </div>
            <ul className={`${styles.order__list} custom-scroll`}>
                {others.map((ingredient) => {
                    return (
                        <li className={styles.element__container} key={ingredient._id}>
                            <DragIcon type='primary' />
                            <ConstructorElement
                                text={`${ingredient.name}`}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </li>
                    )
                })}
            </ul>
            <div className={styles.buns_type_bottom}>
                {buns.map((ingredient) => {
                    return <ConstructorElement
                        key={ingredient._id}
                        type="bottom"
                        isLocked={true}
                        text={`${ingredient.name} (низ)`}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />;
                })}
            </div>
            <div className={styles.OrderContainer}>
                <div className={styles.price}>
                    <p className='text text_type_digits-medium'>100</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={setModalState}>
                    Оформить заказ
                </Button>
            </div>
                {!!modal && 
                <div>
                    <ModalOverlay handleClick={handleCloseModal}>
                    </ModalOverlay>
                    <Modal handleClick={handleCloseModal}>
                        {<OrderDetails handleClick={handleCloseModal} />}
                    </Modal>
                </div>}
        </section>
    );
};

export default BurgerConstructor;