import React, { useContext, useState } from 'react'
import regex from '../exports/regex'
import { ToastContext } from '../exports/toaster'

import { updatePasswordEmail } from '../controller/user.module'
import { postEmail } from '../controller/code.controller'
import { codeCompare } from '../controller/code.controller'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from './Input'
import '../styles/components/buttonHover.css'
import '../styles/components/profileData.css'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
  password: yup.string().required('El campo contraseña es obligatorio').matches(regex.password, "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un numero"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
})

export default function ProfilePassword({ email, code, user }) {
  const navigate = useNavigate()
  const { addToast } = useContext(ToastContext)
  const [loading, setLoading] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [newPassword, setNewPassword] = useState(null)
  var formSubmitted = false

  const { handleSubmit, register, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async formData => {
    if (formSubmitted) return
    formSubmitted = true
    setLoading(true)

    if (!code) await getCode()
    else setConfirmation(code)
    setNewPassword(formData.password)

    formSubmitted = false
    setLoading(false)
  }

  const getCode = async () => {
    try {
      const response = await postEmail(email)
      if (response.status === 200 || response.status === 201) {
        addToast('Se ha enviado un correo con el código de verificación', 'success')
        setConfirmation(response.data.Id)
      } else {
        addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
      }
    } catch (error) {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
    }
  }

  const compareCode = async () => {
    const userCode = document.getElementById('confirmationCode').value
    console.log(userCode, confirmation)
    try {
      const response = await codeCompare(confirmation, userCode)
      if (response.status === 200) {
        return true
      } else {
        addToast('Los codigos no coinciden', 'error')
      }
    } catch (error) {
      addToast('Los codigos no coinciden', 'error')
    }

    return false
  }

  const handleChange = async () => {
    setLoading(true)
    const comparation = await compareCode()
    if (!comparation) {
      resetForm()
      return false
    }
    try {
      const response = await updatePasswordEmail(newPassword, email)
      if (response.status === 204) {
        addToast('Contraseña cambiada con exito.', 'success')
        code = null
        setConfirmation(!confirmation)
        setNewPassword(null)
        setLoading(false)
        return true
      } else {
        addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
      }
    } catch (error) {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
    }
    if (user) navigate('/')
    else navigate('/login')
  }

  const resetForm = () => {
    setConfirmation(!confirmation)
    setNewPassword(null)
    setLoading(false)
    document.getElementById('confirmationCode').value = ''
    document.getElementById('password').value = ''
    document.getElementById('confirmPassword').value = ''
  }

  const onError = () => {
    for (let error in errors) {
      if (errors[error]) {
        addToast(errors[error].message, 'error')
      }
    }
  }

  return (
    <div className='form-box'>
      {loading ? <div className='loader' aria-label="Los datos están cargando"></div> :
      confirmation ? 
      <React.Fragment>
        <h3>Confirmación de correo</h3>
        <p>Se ha enviado un correo de confirmacion a su email, por favor introduzca el codigo de confirmacion para continuar</p>
        <Input type='text' id='confirmationCode' label='Codigo de confirmacion' pattern='^[a-zA-Z0-9]{5}$' maxLength='5' />
        <button name='confirm' className='button-hover' onClick={handleChange}>Confirmar</button>
      </React.Fragment> :
      <React.Fragment>
        <h3>Modificar contraseña</h3>
        <form onSubmit={handleSubmit(onSubmit, onError)} className='formData'>
            <Input type='password' id='password' name='password' label='Contraseña' errorMessage={errors.password?.message} action={{...register('password')}} />
            <Input type='password' id='confirmPassword' name='confirmPassword' label='Confirmar la contraseña' errorMessage={errors.confirmPassword?.message} action={{...register('confirmPassword')}} />
            <button name='change' className='button-hover'>Cambiar</button>
        </form>
      </React.Fragment>}
    </div>
  )
}
