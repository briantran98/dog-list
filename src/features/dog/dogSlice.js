import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    breeds1: [],
    breeds2: [],
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
        dogReorder(state, action) {
            const { draggedIndex, droppedIndex, tableNumber } = action.payload
            const temp = state[`breeds${tableNumber}`][droppedIndex]
            state[`breeds${tableNumber}`][droppedIndex] = state[`breeds${tableNumber}`][draggedIndex]
            state[`breeds${tableNumber}`][draggedIndex] = temp
        }
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

export const { dogReorder } = dogsSlice.actions

export default dogsSlice.reducer