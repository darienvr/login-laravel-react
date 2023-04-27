import React, { useEffect } from 'react'
import { useStateContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom'
import { API_URL } from '../api';
import axios from '../axiosInstance';
import logo from '../assets/react.svg'
import '../App.css'


const DefaultLayout = () => {
      
  const {user, token, setUser, setToken} = useStateContext();

  if(!token){
    return <Navigate to="/login" />
  }

  const Logout = async(e) => {
    e.preventDefault()
    await axios.post(`${API_URL}/logout`).then(() => {
            setUser({})
            setToken(null)
      })
  }

  const GetUser = async() => {
    await axios.get(`${API_URL}/user`)
    .then(({data}) => {
       setUser(data)
    })
  }

  useEffect(() => {
    GetUser()
  }, [])


  return (
    <div className='contenedor-principal'>
        { user.nombre 
        ? 
          <> 
            <h1 className='bienvenida'>¡ Bienvenido {user.nombre} !</h1>
            <img src={logo}></img>
            <br/>
            <button className='btn-logout' onClick={Logout}><b>Cerrar Sesion</b></button>
          </>
        : <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> 
        }
        
    </div>
  )
}

export default DefaultLayout