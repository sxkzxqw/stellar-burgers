import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './ConstructorElementTemplate.module.css'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { moveElement } from '../../../services/features/BurgerConstructorSlice';
import PropTypes from 'prop-types';
import { ingredientTemplatePropTypes } from '../../../utils/prop-types';


const ConstructorElementTemplate = ({ingredient, removeFunction, id, index}) => {
        const ref = useRef(null)
        const dispatch = useDispatch()
        
        const moveCard = (start, end) => {
            let startAndEnd = []
            startAndEnd.push(start)
            startAndEnd.push(end)
            dispatch(moveElement(startAndEnd))
        }

        const [, drop] = useDrop({
          accept: 'constructorElement',
          hover(item, monitor) {
            if (!ref.current) {
              return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
              return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
              (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
          },
        })
        const [, drag] = useDrag({
          type: 'constructorElement',
          item: () => {
            return { id, index }
          },
        })
        drag(drop(ref))

    return (
        <li 
        className={styles.element__container} 
        ref={ref}
        >
            <DragIcon type='primary' />
            <ConstructorElement
                text={`${ingredient.name}`}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => removeFunction(ingredient.uuid)}
            />
        </li>
    );
};

ConstructorElementTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    ingredient: ingredientTemplatePropTypes.isRequired,
    removeFunction: PropTypes.func.isRequired
}


export default ConstructorElementTemplate;
