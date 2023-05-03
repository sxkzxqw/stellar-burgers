import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import styles from './ConstructorElementTemplate.module.css'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { moveElement } from '../../../services/features/BurgerConstructorSlice';
import { TConstructorElementTemplate } from '../../../utils/types/types';
import { useAppDispatch } from '../../../utils/types/hook';
import { Identifier } from 'dnd-core';

const ConstructorElementTemplate: FC<TConstructorElementTemplate> = ({ ingredient, removeFunction, id, index, isHover }) => {
  const ref = useRef<HTMLLIElement>(null)
  const dispatch = useAppDispatch()

  const moveCard = (start: number | undefined, end: number | undefined) => {
    let startAndEnd = []
    startAndEnd.push(start)
    startAndEnd.push(end)
    dispatch(moveElement(startAndEnd))
  }

  const [{ handlerId }, drop] = useDrop<{ id: string, index: number }, unknown, { handlerId: Identifier | null }>({
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
      const dragIndex: number = item.index
      const hoverIndex: number = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset || !hoverBoundingRect) return;
      const hoverClientY = clientOffset?.y - hoverBoundingRect.top
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
