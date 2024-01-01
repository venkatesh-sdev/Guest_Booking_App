/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import URLS from '../constants/URLS';



const initialState = {
    user: null,
    token: localStorage.getItem('userToken') || null,
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

        Logout: (state) => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userDetail');
            localStorage.removeItem('userType');
            state.isLoggedIn = false
            state.userDetail = {};
            state.token = null;
            state.userType = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register Reducers
            .addCase(apiRegister.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(apiRegister.fulfilled, (state, action) => {
                state.status = 'success';
                console.log(action.payload)

            }).addCase(apiRegister.rejected, (state, action) => {
                state.status = 'error';
            })
            // Login Reducers
            .addCase(apiLogin.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(apiLogin.fulfilled, (state, action) => {
                state.status = 'success';
                console.log(action.payload)
            }).addCase(apiLogin.rejected, (state, action) => {
                state.status = 'error';
            })
    }
});


export const {
    Logout
} = AuthReducer.actions;


export const getUserDetails = (state) => state.auth;


export default AuthReducer.reducer;



// if (action.payload.userToken) {
//     localStorage.setItem('userToken', action.payload.userToken);
//     localStorage.setItem('isLoggedIn', action.payload.isLoggedIn);
//     localStorage.setItem('userDetail', action.payload.userDetail);
//     localStorage.setItem('userType', action.payload.userType);
//     state.isLoggedIn = true
//     state.userDetail = action.payload.userDetail;
//     state.token = action.payload.userToken
//     state.userType = action.payload.userType
// }