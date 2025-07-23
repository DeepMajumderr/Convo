import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import getOtherUsers from './customHooks/getOtherUsers'
import { useEffect } from 'react'
import {io} from "socket.io-client"
import { serverUrl } from './main'


const App = () => {
  getCurrentUser()
  getOtherUsers()
  let {userData}=useSelector((state)=>state.user)

  useEffect(() => {

    const socket = io(`${serverUrl}`, {
      query:{
        userId:userData?._id
      }
    })

  }, [userData])

  return (
    <Routes>
      <Route path='/login'  element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path='/signup'  element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
      <Route path='/'  element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path='/profile'  element = {userData ? <Profile /> : <Navigate to="/signup" />} />
    </Routes>
  )
}

export default App