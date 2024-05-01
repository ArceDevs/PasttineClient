import React,{ useContext, useState } from 'react'
import '../styles/pages/contact.css'
import '../styles/components/buttonHover.css'
import InputFull from '../components/InputFull'
import regex from '../exports/regex'
import { ToastContext } from '../exports/toaster'

import { useForm } from 'react-hook-form' 
import { yupResolver } from '@hookform/resolvers/yup' 
import * as yup from 'yup'
import { insertContact, sendEmailAsync } from '../controller/contact.controller'

const schema = yup.object().shape({
  fullName: yup.string().required('El nombre es obligatorio').matches(regex.fullname, "El nombre debe contener al menos 2 palabras"),
  phone: yup.string().matches(regex.phone, "El número de teléfono debe tener 9 digitos"),
  email: yup.string().required('El campo email es obligatorio').email('El email debe ser válido').matches(regex.email, "El email debe ser válido"),
  subject: yup.string().required('El campo asunto es obligatorio'),
  message: yup.string().required('El campo mensaje es obligatorio')
})

export default function Contact() {
  const { addToast } = useContext(ToastContext)
  var errorArray = []
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async formData => {
    setLoading(true)
    const mail = await insertContact(formData)

    const respone = await sendEmailAsync(mail.Id)
    if (respone.status === 200) addToast('El correo se ha enviado con éxito', 'success')
    else addToast(`Hubo un error en el envío del correo: ${respone.message}`, 'error')
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
    <div>
      <div className='faq'>
        <h3 className='h3-style'>Preguntas frecuentes</h3>
        <details className='accordion'>
          <summary className='accordion-title'><span className='typing-animation'>¿Ofreceís algun servicio a parte de la venta de productos?</span></summary>
          <p className='accordion-text'>Sí, en pasttine nos podemos hacer cargo de catering de empresa o bodas y su respectivo pastel de bodas para asegurarnos de que nuestro cliente disfruten sus mejores días de la mejor manera posible</p>
        </details>
        <details className='accordion'>
          <summary className='accordion-title'><span className='typing-animation'>¿Hay opciones veganas o vegetarianas en la carta?</span></summary>
          <p className='accordion-text'>En pasttine nos aseguremos de llegar a todos vosotros por igual por ello nuestra carta incluye todo lo que puedas necesitar dentro de lo posible y en caso de ser necesario algo más nos puedes contactar por aquí para considerar añadirlo</p>
        </details>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='contact-background'>
          <div className='contact-container'>
            <div className='form-elements'>
              <h4 className='contact-title'>¿Necesitas ayuda?</h4>
              {loading ? <div className='loader' aria-label="El carrito se está actualizando"></div> : 
              <React.Fragment>
                <div className='info'>
                  <InputFull label='Nombre completo' id='fullname' name='fullname' type='text' placeholder='Nombre Completo' action={{...register('fullName')}}/>
                  <InputFull label='Teléfono' id='phone' name='phone' type='text' placeholder='Telefono' action={{...register('phone')}} />
                </div>
                <InputFull label='Email' id='email' name='email' type='text' placeholder='Email' action={{...register('email')}} />
                <InputFull label='Asunto' id='subject' name='subject' type='text' placeholder='Asunto' action={{...register('subject')}} />
                <InputFull input='textarea' id='message' name='message' label='Mensaje' action={{...register('message')}} />
                <button type='submit' className='button-hover' id='contact' name='contact' onClick={handleErrors}>Enviar</button>
              </React.Fragment>}
            </div>
            <div className='error-box d-none'>
              {errors.fullName ? errorArray.push(errors.fullName.message) : ''}
              {errors.phone ? errorArray.push(errors.phone.message) : ''}
              {errors.email ? errorArray.push(errors.email.message) : ''}
              {errors.subject ? errorArray.push(errors.subject.message) : ''}
              {errors.message ? errorArray.push(errors.message.message) : ''}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
