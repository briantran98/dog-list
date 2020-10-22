import React, { useState } from 'react';
import './Table.css'
import { useSelector, useDispatch } from 'react-redux'

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

    const allowDrop = e => {
        e.preventDefault();
    }

    const dragStart = e => {
        setStartingIndex(e.target.innerHTML)
        dispatch(setOriginIndex(breeds.findIndex(breed => breed === e.target.innerHTML)))
        dispatch(setOriginTable(currentTable))
    }

    const drop = e => {
        e.preventDefault()
        const destinationBreed = e.target.innerHTML
        if (originTable === currentTable){ 
            dispatch(reorder({originBreed: startingIndex, destinationBreed, currentTable}))
        } else {
            dispatch(moveBetweenTable({ currentTable, destinationBreed, originBreed: startingIndex }))
        }
    }

    const renderedTable = breeds.map((breed, index) => (
        <tr key={breed}>
            <td>
                {++index}
            </td>
            <td className="data" draggable='true' onDragStart={e=>dragStart(e)} onDrop={e=>drop(e)} onDragOver={e=>allowDrop(e) } onMouseOver={e=>e} style={{cursor:"pointer"}}>
                {breed}
            </td>
        </tr>
    ))

    return (
        <table>
            <tbody>
                <tr>
                    <td>Rank</td>
                    <td className="data">Breed {currentTable}</td>
                </tr>
                {renderedTable}
            </tbody>
        </table>
    )
}