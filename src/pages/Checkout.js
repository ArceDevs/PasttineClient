import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../exports/toaster'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

import { purchaseEnd } from '../controller/purchase.controller'

import CheckoutForm from '../components/CheckoutForm'
import CheckoutPayment from '../components/CheckoutPayment'
import CheckoutSuccess from '../components/CheckoutSuccess'
import '../styles/components/buttonHover.css'

export default function Checkout() {
  const navigate = useNavigate()
  const cookie = new Cookies()
  const { addToast } = useContext(ToastContext)
  const userCookie = cookie.get('user')
  const cartCookie = cookie.get('cart')

  useEffect(() => {
    if(!userCookie) {
      addToast('Debes iniciar sesión para realizar una compra', 'error')
      navigate('/login')
    }
  
    if (!cartCookie || cartCookie.Precio === 0) {
      addToast('Tu carrito de la compra está vacio', 'error')
      navigate('/')
    }
  }, []);

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [purchased, setPurchased] = useState(false)
  const [step, setStep] = useState(1)
  const [ticket, setTicket] = useState({})

  useEffect(() => {
    if (purchased !== false) fetchData()
  }, [purchased])

  const fetchData = async () => {
    setLoading(true)
    const facturaData = await purchaseEnd(userCookie.Id, purchased)
    console.log(facturaData)
    if (facturaData.status === 200) {
      setTicket({
        Factura: facturaData.data.Factura,
        Detalles: facturaData.data.DetallesFactura
      })
      cookie.set('cart', {
        Id: cartCookie.Id,
        UsuarioAux: cartCookie.UsuarioAux,
        Precio: 0,
        Promocion: 0,
      }, { path: '/' })
      cookie.set('details', [], { path: '/' })
      setStep(3)
      setLoading(false)
    } else {
      addToast('Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde', 'error')
      navigate('/cart')
    }
  }

  return (
    <div className='form-page'>
      {loading ? <div className='loader' aria-label="Los datos están guardando"></div> :
      step === 1 ? <CheckoutForm setFormData={setFormData} setStep={setStep} setLoading={setLoading} userId={userCookie.Id}/> :
      step === 2 ? <CheckoutPayment setLoading={setLoading} setPurchased={setPurchased} userId={userCookie.Id}/> :
      step === 3 && purchased ? <CheckoutSuccess formData={formData} ticket={ticket} user={userCookie}/> : ''}
    </div>
  )
}
