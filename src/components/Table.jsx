import React, { useState } from 'react';
import './Table.css'
import { useSelector, useDispatch } from 'react-redux'

import { dogReorder } from '../features/dog/dogSlice'

export const Table = ( {tableNumber} ) => {
    const [draggedIndex, setDraggedIndex] = useState('')
    const [droppedIndex, setDroppedIndex] = useState('')

    const dispatch = useDispatch()
    const breeds = useSelector(state => state.dogs[`breeds${tableNumber}`])
    // const breeds = useSelector(state => state.dogs.breeds).slice(0,10)

// 
    const allowDrop = e => {
        e.preventDefault();
    }

    const dragStart = e => {
        setDraggedIndex(breeds.findIndex(breed => breed === e.target.innerHTML))
    }

    const drop = e => {
        e.preventDefault()
        setDroppedIndex(breeds.findIndex(breed => breed === e.target.innerHTML))
    }
  
    const dragEnd = () => {
        console.log(draggedIndex, droppedIndex)
        if (draggedIndex >= 0  && droppedIndex >=0){
            dispatch(dogReorder({draggedIndex, droppedIndex, tableNumber}))
        }
        setDraggedIndex('')
        setDroppedIndex('')
    }
  
    let i = 1;
    
    const renderedTable = breeds.map((breed) => (
        <tr key={breed}>
            <td>
                {i++}
            </td>
            <td draggable='true' onDragStart={e=>dragStart(e)} onDragEnd={e=>dragEnd(e)} onDrop={e=>drop(e)} onDragOver={e=>allowDrop(e)}>
                {breed}
            </td>
        </tr>
    ))

    return (
        <table>
            <tbody>
                <tr>
                    <th>Rank</th>
                    <th>Breed {tableNumber}</th>
                </tr>
                {renderedTable}
            </tbody>
        </table>
    )
}