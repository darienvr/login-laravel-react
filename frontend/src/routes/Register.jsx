import React, { useState } from 'react'
import '../App.css'
import { API_URL } from '../api';
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';

const Register = () => {
    
  const [errors, setErrors] = useState()
  const navigate = useNavigate();
    const [ datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        usuario: "",
        contrasena: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setDatos({
          ...datos, 
          [name]: value 
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          await axios.post(`${API_URL}/register`, datos)
            setDatos({
              nombre: "",
              apellido: "",
              usuario: "",
              contrasena: ""
            })
            alert('Usuario Registrado Exitosamente')
            navigate('/');
        } catch (error) {
          console.log(error.response.data)
          setErrors(error.response.data)
        }
    }

  return (
    <div>
        <h3>Ingrese sus datos: </h3>
        <form onSubmit={handleSubmit} className='formulario'>
          <label className='form-label'><b>Nombre</b> </label>
          <input className='form-control' required type='text' name='nombre' value={datos.nombre} onChange={handleInput}></input> 
          {errors && errors.nombre && (<p className='alerta'>{errors.nombre}</p>)}
          <label className='form-label'><b>Apellido</b> </label> 
          <input className='form-control' required type='text' name='apellido' value={datos.apellido} onChange={handleInput}></input>
          {errors && errors.apellido && (<p className='alerta'>{errors.apellido}</p>)}
          <label className='form-label'><b>Usuario</b> </label>
          <input className='form-control' required type='text' name='usuario' value={datos.usuario} onChange={handleInput}></input>
          {errors && errors.usuario && (<p className='alerta'>{errors.usuario}</p>)}
          <label className='form-label'><b>Contraseña</b></label> 
          <input className='form-control' required type='password' name='contrasena' value={datos.contrasena} onChange={handleInput}></input>
          {errors && errors.contrasena && (<p className='alerta'>{errors.contrasena}</p>)}
          <button className='btn-login' type='submit'>Registrar</button>
          <div className='contenedor-registrarse'>
            <p>¿Ya tiene una cuenta?</p>
            <a className='btn-signup' href='/login'>Iniciar Sesion</a>
          </div>
          
        </form>
    </div>
  )
}

export default Register