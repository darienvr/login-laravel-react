import React, { useState } from 'react'
import '../App.css'
import { API_URL } from '../api';
import axios from 'axios'
import { useStateContext } from '../context/ContextProvider'

const Login = () => {

  const [errors, setErrors] = useState(null)
  const { setUser, setToken} = useStateContext()

  const [data, setData] = useState({
    usuario: "",
    contrasena: ""
  })

  const handleInput = (e) => {
    const { name, value} = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/login`, data)
        setUser(response.data.user)
        setToken(response.data.access_token);
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <div>
        <h1><b>Bienvenido !</b></h1>
        <h5>Ingrese su cuenta</h5>
        <form onSubmit={handleSubmit} className='formulario'>
          <label className='form-label'><b>Usuario</b></label> <br/>
          <input className='form-control' required type='text' name='usuario' value={data.usuario} onChange={handleInput}></input> <br/>
          <label className='form-label'><b>Contraseña</b></label> <br/>
          <input className='form-control' required type='password' name='contrasena' value={data.contrasena} onChange={handleInput}></input> <br/>
          {errors && errors.mensaje && (<p className='alerta'>{errors.mensaje}</p>)}
          <button className='btn-login' type='submit'>Iniciar Sesion</button> <br/>
          <div className='contenedor-registrarse'>
            <p>¿No tiene una cuenta?</p>
            <a className='btn-signup' href='/register'>Registrarse</a>
          </div>
        </form>
    </div>
  )
}

export default Login