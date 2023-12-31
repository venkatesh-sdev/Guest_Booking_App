import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer';
import roomsReducer from './roomsReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        rooms: roomsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store;