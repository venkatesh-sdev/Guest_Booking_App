/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import URLS from '../constants/apiUrls';

const initialState = {
    rooms: [],
    status: 'idle'
}

export const apiAllRooms = createAsyncThunk('rooms/allrooms', async () => {
    try {
        const result = await axios.get(URLS.apiAllRooms);
        return result.data;
    } catch (error) {
        console.log(error)
    }
})


const roomsReducer = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(apiAllRooms.pending, (state, action) => {
                state.status = 'pending';
            }).addCase(apiAllRooms.fulfilled, (state, action) => {
                state.status = 'success';
                state.rooms = action.payload?.data;
            }).addCase(apiAllRooms.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const getRooms = (state) => state.rooms.rooms

// export const { } = roomsReducer.actions;

export default roomsReducer.reducer;