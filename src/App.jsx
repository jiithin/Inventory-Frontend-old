
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"


import Home from './Pages/Home/Home'
import Login from './Pages/auth/Login'
import Forgot from './Pages/auth/Forgot'
import Reset from './Pages/auth/Reset'
import Registers from './Pages/auth/Registers'
import Dashboard from './Pages/Dash/Dashboard'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { SET_LOGIN } from './redux/features/auth/authSlice'
import { getLoginStatus } from './services/authService'


axios.defaults.withCredentials=true;


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
 

  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Registers/>} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/resetpassword/:resetToken' element={<Reset/>} />
        <Route path='/products' element={<Dashboard products/>}/>
        <Route path='/profile' element={<Dashboard profile/>}/>
        <Route path='/addproduct' element={<Dashboard addproduct/>}/>
        <Route path='/contact' element={<Dashboard contact/>}/>
        <Route path='/reportbug' element={<Dashboard reportbug/>}/>
        <Route path='/viewproduct/:id' element={<Dashboard viewproduct/>}/>
        <Route path='/editprofile' element={<Dashboard editprofile/>}/>
        <Route path='/editproduct/:id' element={<Dashboard editproduct/>}/>
        <Route path='/changepassword' element={<Dashboard changepassword/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
