import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    breeds: [],
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
            const { draggedIndex, droppedIndex } = action.payload
            const temp = state.breeds[droppedIndex]
            state.breeds[droppedIndex] = state.breeds[draggedIndex]
            state.breeds[draggedIndex] = temp
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
            state.breeds = action.payload.slice(0,20)
        },
        [fetchDogs.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { dogReorder } = dogsSlice.actions

export default dogsSlice.reducer