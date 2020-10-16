import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async () => {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all')
    return response
})

const dogsSlice = createSlice({
    name:'dogs',
    initialState,
    reducers: {
        dogAdded: {}
    }
})

export const { dogAdded } = dogsSlice.actions

export default dogsSlice.reducer