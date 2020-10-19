import React from 'react';
import { useSelector } from 'react-redux'

export const Button = () => {
    const dogs = useSelector(state => state.dogs)

    const results = {
        dogBreeds: {
            breed1Total: dogs.breeds1.length,
            breed1Rank: {
                
            },
            breed2Total: dogs.breeds2.length,
            breed2Rank:{

            }
        }
    }

    const onClick = e => {
        dogs.breeds1.forEach((breed, index) => {
            results.dogBreeds.breed1Rank[`rank${++index}`] = breed
        });
        dogs.breeds2.forEach((breed, index) => {
            results.dogBreeds.breed2Rank[`rank${++index}`] = breed
        });
        const dataStr = JSON.stringify(results)
        const blob = new Blob([dataStr], {type: "text/plain"})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = 'breedRank.json'
        link.href = url
        link.click();
    }

    return (
        <button onClick={e=> onClick()}>Export</button>
    )
}