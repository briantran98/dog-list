import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    breeds1: [],
    breeds2: [],
    originIndex: null,
    originTable: 0,
    status: 'idle',
    error: null
}

export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async () => {
    const { data } = await axios.get('https://dog.ceo/api/breeds/list/all')
    return Object.keys(data.message)
})

const dogsSlice = createSlice({
    name:'dogs',
    initialState,
    reducers: {
        setOriginIndex(state, action) {
            state.originIndex = action.payload
        },
        setOiriginTable(state, action) {
            state.originTable = action.payload
        },
        setOriginTable(state, action) {
            state.originTable = action.payload
        },
        reorder(state, action) {
            const { originBreed, destinationBreed, currentTable } = action.payload
            const startIndex = state[`breeds${currentTable}`].findIndex(breed => breed === originBreed)
            const endIndex = state[`breeds${currentTable}`].findIndex(breed => breed === destinationBreed)
            const temp = state[`breeds${currentTable}`][endIndex]
            state[`breeds${currentTable}`][endIndex] = state[`breeds${currentTable}`][startIndex]
            state[`breeds${currentTable}`][startIndex] = temp
        },
        moveBetweenTable(state, action) {
            const { currentTable, destinationBreed } = action.payload
            if(state[`breeds${state.originTable}`].length > 1) {
                const endIndex = state[`breeds${currentTable}`].findIndex(breed => breed === destinationBreed)
                const movedDog = state[`breeds${state.originTable}`][state.originIndex]
                state[`breeds${action.payload.currentTable}`].splice(endIndex + 1, 0, movedDog )
                state[`breeds${state.originTable}`].splice(state.originIndex, 1)
                state.error = null
            } else {
                state.error = "Woof Invalid Action Woof"
            }
        },
    },
    extraReducers: {
        [fetchDogs.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchDogs.fulfilled]: (state, action) => {
            state.status = 'completed'
            for(let j = action.payload.length - 1; j >= 0; j--) {
                let swapIndex = Math.floor(Math.random() * j)
                let temp = action.payload[swapIndex]
                action.payload[swapIndex] = action.payload[j]
                action.payload[j] = temp
            }
            state.breeds1 = action.payload.slice(0,10)
            state.breeds2 = action.payload.slice(11,21)
        },
        [fetchDogs.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { 
    setOriginIndex,
    moveBetweenTable,
    setOriginTable,
    reorder } = dogsSlice.actions

export default dogsSlice.reducer