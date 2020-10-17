import React, { useEffect } from 'react';
import './Table.css'
import { useSelector, useDispatch } from 'react-redux'

import { fetchDogs } from '../features/dog/dogSlice'

export const Table = ( {tableNumber} ) => {
    const dispatch = useDispatch()

    const dogStatus = useSelector(state => state.dogs.status)

    const dragStart = event => {
        // event.dataTransfer.setData("Text", event.target.id)
        console.log("Dragging")
    }

    // const drop = e => {
    //     e.preventDefault()
    //     const data = e.dataTransfer.getData("Text")
    //     e.target.appen
    // }
  
    useEffect(() => {
      if (dogStatus === 'idle') {
        dispatch(fetchDogs())
      }

    //   function array_move(arr, old_index, new_index) {
    //     if (new_index >= arr.length) {
    //         let k = new_index - arr.length + 1;
    //         while (k--) {
    //             arr.push(undefined);
    //         }
    //     }
    //     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    //     return arr; // for testing
    // };

    },[dogStatus, dispatch])
  
    let i = 1;
    const breeds = useSelector(state => state.dogs.breeds).slice(0,10)
    const renderedTable = breeds.map((breed) => (
        <tr key={breed}>
            <td>
                {i++}
            </td>
            <td draggable onDragStart={e=>dragStart(e)}>
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