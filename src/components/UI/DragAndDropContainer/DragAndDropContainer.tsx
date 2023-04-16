import React, { FC, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './DragAndDropContainer.module.css'
import { TDnDContainer } from '../../../utils/types/types';

const DragAndDropContainer: FC<TDnDContainer> = ({ children }) => {
    return (
        <div className={styles.cont}>
            <DndProvider backend={HTML5Backend}>
                {children}
            </DndProvider>
        </div>
    );
};

export default DragAndDropContainer;