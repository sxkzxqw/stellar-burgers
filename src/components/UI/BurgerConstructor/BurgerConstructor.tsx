import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
import { useDrop } from 'react-dnd';
import { addConstructorElement, clearElements, removeConstructorElement } from '../../../services/features/BurgerConstructorSlice';
import { sendOrder, setOrderDetails } from '../../../services/features/OrderSlice';
import ConstructorElementTemplate from '../ConstructorElementTemplate/ConstructorElementTemplate';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/types/hook';


const modalRoot = document.getElementById('modal');

const BurgerConstructor = () => {

    const [modal, setModal] = useState(null);
    const navigate = useNavigate()


    const bun = useAppSelector(state => state.burgerConstructor.bun)
    const ingredients = useAppSelector(state => state.burgerConstructor.ingredients)

    function handleCloseModal() {
        setModal(null)
    }

    const isAuth = useAppSelector(state => state.rootReducer?.user?.data)
    function setModalState(state: any) {
        if (isAuth != null) {
            sendRequest()
            setModal(state)
        } else {
            navigate('/login', { replace: true })
        }
    }

    const dispatch = useAppDispatch()

    const removeElement = (uuid: string) => {
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
        const bunsRequestFormat = bun?._id
        requestBody.push(bunsRequestFormat);
        ingredients.forEach((ingredient) => {
            requestBody.push(ingredient._id)
        })
        requestBody.push(bunsRequestFormat);
        dispatch(sendOrder(requestBody))
        dispatch(clearElements())
    }

    const scrollbarShow = Boolean(ingredients.length > 4);

    return (
        <section className={styles.basket} ref={dropTarget}>
            <div className={styles.buns} style={{ marginBottom: scrollbarShow ? '16px' : '0px' }}>
                {(bun != null)
                    ? <ConstructorElement
                        {...bun}
                        extraClass={`${isHover ? styles.hoverHandler : ''}`}
                        type='top'
                        isLocked={true}
                        text={`${bun.name} (вверх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                    : <ConstructorElement
                        extraClass={`${isHover ? styles.hoverHandler : ''}`}
                        text='Выберите булку'
                        type='top'
                        isLocked={true}
                        thumbnail='https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg'
                        price={0}
                    />
                }
            </div>
            <ul className={`${styles.order__list} custom-scroll`} style={{ paddingRight: scrollbarShow ? '0px' : '8px', paddingBottom: scrollbarShow ? '0px' : '16px', paddingTop: scrollbarShow ? '0px' : '16px' }}>
                {ingredients?.map((ingredient, index) => {
                    return (
                        <ConstructorElementTemplate
                            isHover={isHover}
                            ingredient={ingredient}
                            removeFunction={removeElement}
                            key={ingredient.uuid}
                            id={ingredient.uuid}
                            index={index}
                        />
                    )
                })}
            </ul>
            <div className={styles.buns_type_bottom} style={{ marginTop: scrollbarShow ? '16px' : '0px' }}>
                {(bun != null)
                    ? <ConstructorElement
                        {...bun}
                        extraClass={`${isHover ? styles.hoverHandler : ''}`}
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                    : <ConstructorElement
                        extraClass={`${isHover ? styles.hoverHandler : ''}`}
                        text='Выберите булку'
                        type='bottom'
                        isLocked={true}
                        thumbnail='https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg'
                        price={0}
                    />
                }
            </div>
            <div className={styles.OrderContainer}>
                <div className={styles.price}>
                    <p className='text text_type_digits-medium'>{summa}</p>
                    <CurrencyIcon type='primary' />
                </div>
                {ingredients.length == 0 || bun == null
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
                        {<OrderDetails />}
                    </Modal>
                </div>}
        </section>
    );
};

export default BurgerConstructor;