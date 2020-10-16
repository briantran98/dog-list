import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from '../features/dog/dogSlice'

export default configureStore({
    reducer: {
        dogs: dogsReducer
    }
})