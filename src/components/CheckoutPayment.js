import React, { useContext, useState } from 'react'
import regex from '../exports/regex'
import { ToastContext } from '../exports/toaster'

import { patchEstado, createFactura } from '../controller/purchase.controller'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from './Input'
import '../styles/components/buttonHover.css'

const schema = yup.object().shape({
  ccv: yup.string().required('El campo de ccv es obligatorio').matches(regex.cardCvv, "El ccv debe tener 3 digitos"),
  creditCard: yup.string().required('El campo de targeta de credito es obligatorio').matches(regex.creditCard, "El número de targeta debe tener 16 digitos"),
  dateCard: yup.string().required('El campo de fecha es obligatorio').matches(regex.dateCard, "El formato de fecha es MM/AA y debe ser posterior a la fecha actual"),
  fullname: yup.string().required('El campo de nombre es obligatorio').matches(regex.fullname, "El nombre debe contener al menos 2 palabras"),
})

export default function CheckoutPayment({ setPurchased, userId }) {
  const { addToast } = useContext(ToastContext)
  const { handleSubmit, register, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const [loadingPay, setLoadingPay] = useState(false)
  var formSubmitted = false
  const onSubmit = async formData => {
    if (formSubmitted) return
    formSubmitted = true
    setLoadingPay(true)

    try {
      const factura = await createFactura(userId)
      if (factura.status === 201) {
        const response = await patchEstado(factura.data.Id, 'Pagado')
        if (response.status === 204) {
          setPurchased(factura.data.Id)
        } else {
          addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
        }
      }
    } catch (error) {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
    }
    setLoadingPay(false)
    formSubmitted = false
  }
  
  const onError = () => {
    for (let error in errors) {
      if (errors[error]) {
        addToast(errors[error].message, 'error');
      }
    }
  }

  return (
    <div className='form-box'>
      {loadingPay ? <div className='loader' aria-label="Los datos están cargando"></div> : 
      <React.Fragment>
        <h3>Datos de tarjeta</h3>
        <form onSubmit={handleSubmit(onSubmit, onError)} className='formData'>
          <Input type='text' name='fullname' label='Nombre del titular' errorMessage={errors.fullname?.message} action={{...register('fullname')}} />
          <Input type='text' name='creditCard' label='Número de targeta' errorMessage={errors.creditCard?.message} action={{...register('creditCard')}} />
          <div className='double-input'>
            <Input type='text' name='dateCard' label='Fecha de caducidad' errorMessage={errors.dateCard?.message} action={{...register('dateCard')}} />
            <Input type='text' name='ccv' label='CCV' errorMessage={errors.ccv?.message} action={{...register('ccv')}} />
          </div>
          <button name='purchase' className='button-hover'>Pagar</button>
        </form>  
      </React.Fragment>}
    </div>
  )
}
