import React, { useEffect } from 'react'
import { useStateContext } from '../context/ContextProvider'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import '../App.css'
import login from '../assets/login.jpg'

const GuestLayout = () => {

  
  const {token} = useStateContext();
  const navigate = useNavigate();

  if(token){
    return <Navigate to="/" />
  }
  
  return (
    <div className='contenedor-form'>
      <div className='contenedor-img'>
        <img className='img-login' src={login}></img>
      </div>
      <div className='contenedor-formulario'>
        <Outlet />
      </div>
    </div>
  )
}

export default GuestLayout