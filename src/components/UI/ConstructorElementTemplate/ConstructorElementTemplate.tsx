import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import styles from './ConstructorElementTemplate.module.css'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { moveElement } from '../../../services/features/BurgerConstructorSlice';
import PropTypes from 'prop-types';
import { TConstructorElementTemplate } from '../../../utils/types/types';


const ConstructorElementTemplate: FC<TConstructorElementTemplate> = ({ ingredient, removeFunction, id, index, isHover }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()

  const moveCard = (start: number[], end: number[]) => {
    let startAndEnd = []
    startAndEnd.push(start)
    startAndEnd.push(end)
    dispatch(moveElement(startAndEnd))
  }

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorElement',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
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
  const [{ isDragging }, drag] = useDrag({
    type: 'constructorElement',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })
  drag(drop(ref))

  return (
    <li
      className={`${styles.element__container} ${isDragging ? styles.visible : ''}`}
      ref={ref}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        extraClass={`${isHover ? styles.hoverHandler : ''}`}
        text={`${ingredient.name}`}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeFunction(ingredient.uuid)}
      />
    </li>
  );
};

export default ConstructorElementTemplate;
