import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
import { useDrop } from 'react-dnd';
import { addConstructorElement, removeConstructorElement } from '../../../services/features/BurgerConstructorSlice';
import { sendOrder, setOrderDetails } from '../../../services/features/OrderSlice';
import ConstructorElementTemplate from '../ConstructorElementTemplate/ConstructorElementTemplate';


const modalRoot = document.getElementById('modal');

const BurgerConstructor = (props) => {

    const [modal, setModal] = useState(null);


    const bun = useSelector(state => state.burgerConstructor.bun)
    const ingredients = useSelector(state => state.burgerConstructor.ingredients)

    function handleCloseModal() {
        setModal(null)
    }

    function setModalState(state) {
        sendRequest()
        setModal(state)
    }

    const dispatch = useDispatch()

    const removeElement = (uuid) => {
        dispatch(removeConstructorElement(uuid))
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(itemId, monitor) {
            dispatch(addConstructorElement(itemId));
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    })

    const { children } = props;

    const summa = useMemo(() => {
        let sum = 0;
        sum += bun ? bun?.price * 2 : 0
        ingredients?.map((ingredient) => {
            sum += ingredient.price;
        })
        return sum;
    })

    const sendRequest = () => {
        const requestBody = []
        const bunsRequestFormat = bun._id
        requestBody.push(bunsRequestFormat);
        ingredients.forEach((ingredient) => {
            requestBody.push(ingredient._id)
        })
        requestBody.push(bunsRequestFormat);
        dispatch(sendOrder(requestBody))
    }

    const scrollbarShow = Boolean(ingredients.length > 5);

    return (
        <section className={styles.basket} ref={dropTarget}>
            <div className={styles.buns}>
                {(bun != null)
                    ? <ConstructorElement
                        {...bun}
                        type='top'
                        isLocked={true}
                        text={`${bun.name} (вверх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                    : <ConstructorElement
                        text='Выберите булку'
                        type='top'
                        isLocked={true}
                        thumbnail='https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg'
                    />
                }
            </div>
            <ul className={`${styles.order__list} custom-scroll`} style={{paddingRight: scrollbarShow ? '0px' : '8px'}}>
                {ingredients?.map((ingredient, index) => {
                    return (
                        <ConstructorElementTemplate
                            ingredient={ingredient}
                            removeFunction={removeElement}
                            key={ingredient.uuid}
                            id={ingredient.uuid}
                            index={index}
                        />
                    )
                })}
                {children}
            </ul>
            <div className={styles.buns_type_bottom}>
                {(bun != null)
                    ? <ConstructorElement
                        {...bun}
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                    : <ConstructorElement
                        text='Выберите булку'
                        type='bottom'
                        isLocked={true}
                        thumbnail='https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg'
                    />
                }
            </div>
            <div className={styles.OrderContainer}>
                <div className={styles.price}>
                    <p className='text text_type_digits-medium'>{summa}</p>
                    <CurrencyIcon type='primary' />
                </div>
                {ingredients == false || bun == null
                    ? <Button htmlType="button" type="primary" size="medium" onClick={setModalState} disabled>
                        Оформить заказ
                       </Button>
                    : <Button htmlType="button" type="primary" size="medium" onClick={setModalState}>
                        Оформить заказ
                       </Button>
                }
            </div>
            {!!modal &&
                <div>
                    <Modal handleClick={handleCloseModal}>
                        {<OrderDetails handleClick={handleCloseModal} />}
                    </Modal>
                </div>}
        </section>
    );
};

export default BurgerConstructor;