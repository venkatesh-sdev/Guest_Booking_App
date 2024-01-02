/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import URLS from '../constants/apiUrls';



const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isLoggedIn: localStorage.getItem('isLoggedIn') || "false",
    status: 'idle'
}

export const apiRegister = createAsyncThunk('auth/Register', async (data) => {
    try {
        const result = await axios.post(URLS.apiRegister, data);
        return result.data;
    } catch (error) {
        console.log(error)
        return error
    }
});

export const apiLogin = createAsyncThunk('auth/Login', async (data) => {
    try {
        const result = await axios.post(URLS.apiLogin, data);
        return result.data;
    } catch (error) {
        console.log(error)
        return error
    }
});


const AuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
        },

        Logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user')
            state.isLoggedIn = 'false'
            state.user = null;
            state.token = null;
            state.status = 'logout'
        }
    },
    extraReducers: (builder) => {
        builder
            // Register Reducers
            .addCase(apiRegister.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(apiRegister.fulfilled, (state, action) => {
                state.status = 'registered';
            }).addCase(apiRegister.rejected, (state, action) => {
                state.status = 'error';
            })
            // Login Reducers
            .addCase(apiLogin.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(apiLogin.fulfilled, (state, action) => {
                state.status = 'loggedin';
                if (action.payload.token) {
                    localStorage.setItem('token', action.payload.token);
                    localStorage.setItem('isLoggedIn', "true")
                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                    state.isLoggedIn = "true"
                    state.token = action.payload.token
                    state.user = action.payload.user;
                }
            }).addCase(apiLogin.rejected, (state, action) => {
                state.status = 'error';
            })
    }
});


export const {
    resetStatus,
    Logout
} = AuthReducer.actions;


export const getUser = (state) => state.auth;
export const getToken = (state) => state.auth.token;


export default AuthReducer.reducer;



