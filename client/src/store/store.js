import {configureStore} from '@reduxjs/toolkit'
import auth from './authSlice';
import disableNext from './disableSlice.js'
const store = configureStore(
    {
        reducer:{
            auth,
            disableNext,
        }
    }
)

export default store;