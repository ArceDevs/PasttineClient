import React, { useContext, useState, useEffect } from 'react'
import regex from '../exports/regex'
import { ToastContext } from '../exports/toaster'

import { getInvoiceUser, patchInvoiceUser } from '../controller/invoice.controller'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from './Input'
import '../styles/components/buttonHover.css'

const schema = yup.object().shape({
  address: yup.string().required('El campo dirección de facturación es obligatorio'),
  address2: yup.string(),
  phone: yup.string().matches(regex.phone, "El número de teléfono debe tener 9 digitos"),
  cp: yup.string().required('El campo código postal es obligatorio').matches(regex.cp, "El código postal debe tener 5 digitos"),
  province: yup.string().required('El campo provincia es obligatorio').matches(regex.province, "El campo provincia solo puede contener letras"),
})

export default function CheckoutForm({ setFormData, setStep, userId }) {
  const { addToast } = useContext(ToastContext)
  const [remember, setRemember] = useState(false)
  const [loadingForm, setLoadingForm] = useState(true)
  const [purchaseData, setPurchaseData] = useState(null)
  var formSubmitted = false

  useEffect(() => {
    getInvoiceUser(userId).then(data => {
      setPurchaseData(data)
      setLoadingForm(false)
      setRemember(data.Recordar)
    })
  }, [userId])
  const { handleSubmit, register, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address: purchaseData?.Direccion,
      address2: purchaseData?.Direccion2,
      province: purchaseData?.Provincia,
      phone: purchaseData?.Telefono,
      cp: purchaseData?.Cp
    }
  })

  const onSubmit = async formData => {
    if (formSubmitted) return
    formSubmitted = true
    try {
      formData.userId = userId
      formData.remember = remember
      const response = await patchInvoiceUser(formData)
      if (response.status === 204) {
        setFormData(formData)
        setStep(2)
      } else {
        addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
      }
    } catch (error) {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
    }
    formSubmitted = false
  }
  
  const onError = () => {
    for (let error in errors) {
      if (errors[error]) {
        addToast(errors[error].message, 'error')
      }
    }
  }

  const handleCheckboxChange = (event) => {
    setRemember(event.target.checked)
  }

  return (
    <div className='form-box'>
      {loadingForm ? <div className='loader' aria-label="Los datos están cargando"></div> :
      <React.Fragment>
        <h3>Datos de compra</h3>
        <form onSubmit={handleSubmit(onSubmit, onError)} className='formData'>
          <Input type='text' defaultValue={purchaseData.Direccion} name='address' label='Dirección de facturación' errorMessage={errors.address?.message} action={{...register('address')}} />
          <Input type='text' defaultValue={purchaseData.Direccion2} name='address2' label='Dirección de facturación secundaria (opcional)' errorMessage={errors.address2?.message} action={{...register('address2')}} />
          <div className='double-input'>
            <Input type='text' defaultValue={purchaseData.Provincia} name='province' label='Provincia' errorMessage={errors.province?.message} action={{...register('province')}} />
            <Input type='text' defaultValue={purchaseData.Cp} name='cp' label='Código postal' errorMessage={errors.cp?.message} action={{...register('cp')}} />
          </div>
          <Input type='text' defaultValue={purchaseData.Telefono} name='phone' label='Teléfono' errorMessage={errors.phone?.message} action={{...register('phone')}} />
          <label className='check-box-container'>
              ¿Desea recordar estos datos para futuras compras?
              <input type='checkbox' name='remember' checked={remember} onChange={handleCheckboxChange}/>
              <span className="checkmark"></span>
            </label>
          <button name='save' className='button-hover'>Guardar</button>
        </form>
      </React.Fragment>}
    </div>
  )
}
