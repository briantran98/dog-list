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
        dogAdded: {
            reducer(state, action) {
                state.breeds.push(action.payload)
            }
        }
    },
    extraReducers: {
        [fetchDogs.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchDogs.fulfilled]: (state, action) => {
            state.status = 'completed'
            state.breeds = state.breeds.concat(action.payload)
        },
        [fetchDogs.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { dogAdded } = dogsSlice.actions

export default dogsSlice.reducer