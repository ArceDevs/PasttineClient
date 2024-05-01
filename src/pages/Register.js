import React, { useContext, useState } from 'react'
import regex from '../exports/regex'
import { ToastContext } from '../exports/toaster'

import { useNavigate } from 'react-router-dom'
import { registerUser, registerConfirmation } from '../controller/login.module'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from '../components/Input'
import '../styles/components/buttonHover.css'

const schema = yup.object().shape({
  firstname: yup.string().required('El campo nombre es obligatorio').matches(regex.firstname, "El nombre debe contener al menos 2 palabras"),
  lastname: yup.string().required('El campo apellido es obligatorio').matches(regex.lastname, "El apellido debe contener al menos 2 palabras"),
  username: yup.string().required('El campo nombre de usuario es obligatorio').matches(regex.name, "El nombre de usuario debe contener al menos 4 caracteres"),
  email: yup.string().required('El campo email es obligatorio').email('El email debe ser válido').matches(regex.email, "El email debe ser válido"),
  password: yup.string().required('El campo contraseña es obligatorio').matches(regex.password, "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un numero"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
})

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  var formSubmitted = false
  const [data, setData] = useState({})

  const { addToast } = useContext(ToastContext)
  const { handleSubmit, register, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()

  const onSubmit = async formData => {
    if (formSubmitted) return
    formSubmitted = true
    setLoading(true)
    try {
      const response = await registerConfirmation(formData.email)
      console.log(response)

      if (response.status === 201) {
        setData(formData)
        setConfirmation(response.data.code)
      } else if (response.status === 409) {
        addToast('El correo utilizado ya está registrado.', 'error')
      } else {
        addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
      }
    } catch (error) {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
    }
    setLoading(false)
    formSubmitted = false
  }
  
  const onError = () => {
    console.log(errors)
    for (let error in errors) {
      if (errors[error]) {
        addToast(errors[error].message, 'error');
      }
    }
  }

  const handleRegister = async () => {
    if (confirmation !== document.getElementById('confirmationCode').value) {
      addToast('Los codigos no coinciden', 'error')
      return false
    }
    setLoading(true)
    try {
      const response = await registerUser(data)
      console.log(response)
      if (response.status === 201) {
        addToast('Usuario registrado con exito.', 'success')
        navigate('/login')
      } else if (response.status === 409) {
        addToast('El correo utilizado ya está registrado.', 'error')
      } else {
        addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
      }
    } catch (error) {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
    }
    setLoading(false)
  }

  return (
    <div className='form-page'>
      <div className='form-box'>
        {loading ? <div className='loader' aria-label="El registro esta en curso"></div> :
        confirmation ? 
        <React.Fragment>
          <h3>Confirmación de correo</h3>
          <p>Se ha enviado un correo de confirmacion a su email, por favor introduzca el codigo de confirmacion para continuar</p>
          <Input type='text' id='confirmationCode' label='Codigo de confirmacion' pattern='^[a-zA-Z0-9]{5}$' maxLength='5' />
          <button name='confirm' className='button-hover' onClick={handleRegister}>Confirmar</button>
        </React.Fragment> :
        <React.Fragment>
          <h3>Registrarse</h3>
          <form onSubmit={handleSubmit(onSubmit, onError)} className='formSign'>
            <div className='double-input'>
              <Input type='text' name='firstname' label='Nombre' errorMessage={errors.firstname?.message} action={{...register('firstname')}} />
              <Input type='text' name='lastname' label='Apellido' errorMessage={errors.lastname?.message} action={{...register('lastname')}} />
            </div>
            <Input type='text' name='username' label='Nombre de usuario' errorMessage={errors.username?.message} action={{...register('username')}} />
            <Input type='text' name='email' label='Email' errorMessage={errors.email?.message} action={{...register('email')}} />
            <Input type='password' name='password' label='Contraseña' errorMessage={errors.password?.message} action={{...register('password')}} />
            <Input type='password' name='confirmPassword' label='Confirmar la contraseña' errorMessage={errors.confirmPassword?.message} action={{...register('confirmPassword')}} />
            <button name='register' className='button-hover'>Register</button>
          </form>
        </React.Fragment>}
      </div>
    </div>
  )
}
