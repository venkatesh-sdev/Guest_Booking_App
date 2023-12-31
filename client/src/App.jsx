/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { HomePage, RegisterPage, LoginPage, AddRoomPage } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './context/authReducer';
import Page404 from './pages/Page404';


const App = () => {
  const user = useSelector(getUserDetails);
  const dispatch = useDispatch();

  if (user.isLoggedIn) {
    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/addroom' element={<AddRoomPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    );
  }



  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/addroom' element={<AddRoomPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  )
}

export default App