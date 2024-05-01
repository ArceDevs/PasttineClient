import React, { useState, useContext } from 'react'
import { ToastContext } from '../exports/toaster'
import '../styles/components/buttonHover.css'

import ProfilePassword from '../components/ProfilePassword'
import { postEmail } from '../controller/code.controller'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import regex from '../exports/regex'
import Input from '../components/Input'

const schema = yup.object().shape({
  email: yup.string().required('El campo email es obligatorio').email('El email debe ser válido').matches(regex.email, "El email debe ser válido")
})

export default function Reset() {
  const { addToast } = useContext(ToastContext)
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [idCode, setIdCode] = useState('')
  const [email, setEmail] = useState('')
  const { handleSubmit, register, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async formData => {
    setLoadingEmail(true)
    try {
      const response = await postEmail(formData.email)
      if (response.status === 200 || response.status === 201) {
        addToast('Se ha enviado un correo con el código de verificación', 'success')
        setIdCode(response.data.Id)
        setEmail(formData.email)
      } else {
        addToast('El correo electrónico indicado no está registrado', 'error')
      }
    } catch (error) {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
    }
    setLoadingEmail(false)
  }

  const onError = () => {
    for (let error in errors) {
      if (errors[error]) {
        addToast(errors[error].message, 'error')
      }
    }
  }

  return (
    <div className='form-page'>
      {loadingEmail ? <div className='loader' aria-label="Comprobando creedenciales"></div> :
      !idCode ?
      <div className='form-box'>
        <h3>Recuperar contraseña</h3>
        <p>Inserte su correo electrónico</p>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Input type='text' name='email' label='Email' errorMessage={errors.email?.message} action={{...register('email')}} />
          <button type='submit' className='buttonHover'>Recuperar</button>
        </form>
      </div> :
      <ProfilePassword code={idCode} email={email}/>}
    </div>
  )
}
