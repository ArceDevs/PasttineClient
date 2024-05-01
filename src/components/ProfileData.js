import React, { useContext, useState } from 'react'
import regex from '../exports/regex'
import { ToastContext } from '../exports/toaster'
import API_CONFIG from '../controller/api.config'

import { patchUserData, patchUserPfp } from '../controller/user.module'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from './Input'
import '../styles/components/buttonHover.css'
import '../styles/components/profileData.css'
import { BsPerson } from 'react-icons/bs'

const schema = yup.object().shape({
  firstname: yup.string()
    .nullable()
    .matches(regex.firstname, "Formato de nombre invalido"),
  lastname: yup.string()
    .nullable()
    .matches(regex.lastname, "Formato de nombre invalido"),
  username: yup
    .string()
    .required('El campo nombre de usuario es obligatorio')
    .matches(regex.name, "Formato de nombre de usuario invalido"),
  phone: yup.string()
    .nullable()
    .matches(regex.phone, "Formato de teléfono invalido"),
  birthDate: yup.string()
    .nullable()
    .matches(regex.birthDate, "Formato de fecha de nacimiento invalido"),
});


export default function ProfileData({ user, setUser, cookie }) {
  const { addToast } = useContext(ToastContext)
  const [loadingForm, setLoadingForm] = useState(false)
  const [file, setFile] = useState(null)
  var formSubmitted = false

  const { handleSubmit, register, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: user.Nombre,
      lastname: user.Apellido,
      username: user.Username,
      phone: user.Telefono,
      birthDate: user.FechaNac
    }
  })

  const onSubmit = async formData => {
    if (formSubmitted) return
    formSubmitted = true
    setLoadingForm(true)
    let newUser = {}

    try {
      const response = await patchUserData(formData, user.Id)
      if (response.status === 204) {
        newUser = {
          Id: user.Id,
          Auth: user.Auth,
          Email: user.Email,
          Nombre: formData.firstname,
          Apellido: formData.lastname,
          Username: formData.username,
          Telefono: formData.phone,
          FechaNac: formData.birthDate,
          PFP: user.PFP
        }
        addToast('Datos actualizados correctamente', 'success')
        if (file) {
          const updatedPFP = await patchUserPfp(file, user.Id)
          newUser.PFP= `media/images/users/${user.Id}-${file.name}`
          if (updatedPFP.status !== 204) addToast('Ha ocurrido un error al cargar la nueva imagen de perfil', 'error')
        }
        console.log(newUser)
      } else {
        addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
      }
    } catch (error) {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
    }

    cookie.set('user', newUser, { path: '/' })
    setUser(newUser)
  }
  
  const onError = () => {
    for (let error in errors) {
      if (errors[error]) {
        addToast(errors[error].message, 'error')
      }
    }
  }

  const handlePfp = event => {
    const file = event.target.files[0]
    if (!file) return
    const fileType = file.type;
    if (file.size > 1000000) { // 1MB
      addToast('El archivo es demasiado grande', 'error')
      return
    }
    if (file.name.length > 100) {
      addToast('El nombre del archivo es demasiado largo', 'error')
      return
    }
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      addToast('El archivo debe ser un .jpg o .png', 'error');
      return;
    }
    setFile(file)
  }

  return (
    <div className='form-box'>
      {loadingForm ? <div className='loader' aria-label="Los datos están cargando"></div> :
      <React.Fragment>
        <h3>Datos del usuario</h3>
        <form onSubmit={handleSubmit(onSubmit, onError)} className='formData'>
          <div className='img-profile'>
            {file !== null ? <img src={URL.createObjectURL(file)} alt='Imagen de perfil' /> : 
            user.PFP ? <img src={API_CONFIG.BASE_URL+user.PFP} alt='Imagen de perfil' /> : 
            <BsPerson size={150}/>}
            <input type='file' id='pfp' name='pfp' onChange={handlePfp} />
          </div>
          <Input type='text' defaultValue={user.Username} id='username' name='username' label='Nombre de usuario' errorMessage={errors.username?.message} action={{...register('username')}} />
          <div className='double-input'>
            <Input type='text' defaultValue={user.Nombre} id='firstname' name='firstname' label='Nombre' errorMessage={errors.firstname?.message} action={{...register('firstname')}} />
            <Input type='text' defaultValue={user.Apellido} id='lastname' name='lastname' label='Apellido' errorMessage={errors.lastname?.message} action={{...register('lastname')}} />
          </div>
          <div className='double-input'>
            <Input type='text' defaultValue={user.Telefono} id='phone' name='phone' label='Telefono' errorMessage={errors.phone?.message} action={{...register('phone')}} maxLength={12}/>
            <Input type='text' defaultValue={user.FechaNac} id='birthDate' name='birthDate' label='Fecha de nacimiento' errorMessage={errors.birthDate?.message} action={{...register('birthDate')}} maxLength={10}/>
          </div>
          <button name='save' className='button-hover'>Guardar</button>
        </form>
      </React.Fragment>}
    </div>
  )
}
