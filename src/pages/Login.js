import React, { useContext, useState } from 'react'
import Cookies from 'universal-cookie'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { NavLink } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
import regex from '../exports/regex'

import { loginAsync } from '../controller/login.module'
import { createCart, getCartFullUserSync } from '../controller/cart.controller'
import Input from '../components/Input'
import { ToastContext } from '../exports/toaster'

import '../styles/pages/loginStyle.css'
import '../styles/components/buttonHover.css'

const schema = yup.object().shape({
  email: yup.string().required('El campo email es obligatorio').email('El email debe ser válido').matches(regex.email, "El email debe ser válido"),
  password: yup.string().required('El campo contraseña es obligatorio').matches(regex.password, "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un numero"),
})

export default function Login({ createSession }) {
  const { addToast } = useContext(ToastContext)
  var errorArray = []
  const { handleSubmit, register, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const cookie = new Cookies()
  const [loading, setLoading] = useState(false)
  
  const handleCreateCart = (user) => {
    createCart(user.Id, (error, cart) => {
      if (error) {
        cookie.set('cart', [], {path: '/'})
      } else {
        cookie.set('cart', {
          Id: cart.Id,
          UsuarioAux: user.Id
        }, {path: '/'})
      }
    })
  }
  
  const handleLoginSuccess = (user) => {
    createSession(user)
    getCartFullUserSync(user.Id, (error, response) => {
      if (response.status === 206 || response.status === 200) {
        cookie.set('cart', response.data.data.Carrito[0], {path: '/'})
        if (response.data.data.Detalles) cookie.set('details', response.data.data.Detalles, {path: '/'})
        else cookie.set('details', [], {path: '/'})
      } else {
        handleCreateCart(user)
      }
      navigate('/')
    })
  }
  
  const formSubmit = async data => {
    setLoading(true)
    try {
      const respones = await loginAsync(data)
      if (respones.status === 200){
        const user = respones.data.data
        handleLoginSuccess(user)
      } else {
        addToast('La contraseña o el correo electrónico no son correctos', 'error')
      }
    } catch (error) {
      addToast('Ha ocurrido un error de conexión', 'error')
    }
    setLoading(false)
  }

  const handleErrors = () => {
    if (errorArray.length > 0) {
      errorArray.forEach(error => {
        addToast(error, 'error')
      })
    }
    errorArray = []
  }

  return (
    <div className='signPage'>
      <div className='form-box'>
        <h3>Iniciar Sesión</h3>
        {loading ? <div className='loader' aria-label="Comprobando creedenciales"></div>: 
        <form onSubmit={handleSubmit(formSubmit)} className='formSign'>
          <Input type='text' name='email' label='Correo electrónico' action={{...register('email')}}/>
          <Input type='password' name='password' label='Contraseña' action={{...register('password')}}/>
          <button name='login' className='button-hover' onClick={handleErrors}>Login</button>
        </form>}
        <div className='text-rigth'><NavLink to='/register' className='text-link'>No tengo cuenta</NavLink></div>
        <div className='text-rigth'><NavLink to='/login/reiniciar' className='text-link'>¿Has olvidado tu contraseña?</NavLink></div>
        <div className='d-none'>
          {errors.email ? errorArray.push(errors.email.message) : ''}
          {errors.password ? errorArray.push(errors.password.message) : ''}
        </div>
      </div>
    </div>
  )
}
