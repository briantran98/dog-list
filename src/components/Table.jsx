import React, { useState } from 'react';
import './Table.css'
import { useSelector, useDispatch } from 'react-redux'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { 
    setOriginIndex,
    moveBetweenTable,
    setOriginTable,
    reorder } from '../features/dog/dogSlice'

export const Table = ( {tableNumber: currentTable} ) => {
    const [startingIndex, setStartingIndex] = useState(null)

    const dispatch = useDispatch()
    const breeds = useSelector(state => state.dogs[`breeds${currentTable}`])
    const originTable = useSelector(state => state.dogs.originTable)

    let i = 0;
    const renderTable = breeds.map((breed, index) => (
        <tr>
            <td>
                {++i}
            </td>
            <Draggable draggableId={breed} index={index}>
                {provided => (
                    <td 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {breed}
                    </td>
                )}

            </Draggable>
        </tr>
    ))


    return (
        <Droppable
            droppableId={currentTable}
        >
            {provided => (
                <table {...provided.droppableProps} ref={provided.innerRef}>
                    <tr>
                        <th>Rank</th>
                        <th>Breed {currentTable}</th>
                    </tr>
                    {renderTable}
                    
                </table>
            )}
        </Droppable>
        
    )
}