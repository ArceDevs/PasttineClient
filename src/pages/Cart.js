import React, { useState, useEffect, useContext }  from 'react'
import Cookies from 'universal-cookie'
import { ToastContext } from '../exports/toaster'

import CartItem from '../components/CartItem'
import { patchCart, deleteDetail, emptyCart } from '../controller/cart.controller'
import { checkCartFull } from '../exports/updateCart'
import '../styles/pages/cart.css'
import { useNavigate  } from 'react-router-dom'

export default function Cart() {
  const { addToast } = useContext(ToastContext)
  const cookie = new Cookies()
  const navigate = useNavigate()
  const userCookie = cookie.get('user')
  var cartCookie = cookie.get('cart') || {}
  const [loading, setLoading] = useState(false)
  const [detailsCookie, setDetailsCookie] = useState(cookie.get('details') || [])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let total = 0
    if (detailsCookie && detailsCookie.constructor.name === 'Array' && detailsCookie.length > 0) {
      detailsCookie.forEach(detail => {
        total += (parseFloat(detail.PrecioDetalle) * parseFloat(detail.Cantidad))
      })
      if (cartCookie && cartCookie.Descuento) total -= (total * parseFloat(cartCookie.Descuento) / 100)
      setTotalPrice(total)
    } else {
      setTotalPrice(total)
    }
    cartCookie.Precio = total
    cookie.set('cart', cartCookie, {path: '/'})
    if (userCookie) {
      patchCart(cartCookie, (error, response) => {
        if (error) return false
      })
    }
    cookie.set('details', detailsCookie, {path: '/'})
  }, [detailsCookie])

  const handleEmptyCart = async () => {
    let tempCart = {
      Id: 0,
      UsuarioAux: 0,
      Precio: 0,
      Promocion: 0
    }
    setLoading(true)
    if (userCookie) {
      tempCart.Id = cartCookie.Id
      tempCart.UsuarioAux = userCookie.Id
      try {
        await emptyCart(cartCookie.Id)
      } catch {
        addToast('Ha ocurrido un error inesperado', 'error')
        setLoading(false)
        return
      }
    }
    cartCookie = tempCart
    cookie.set('cart', tempCart, {path: '/'})
    cookie.set('details', [], {path: '/'})
    setDetailsCookie([])
    setLoading(false)
    addToast('Carrito vaciado', 'success')
  }

  const handleRemoveItem = (item) => {
    if (userCookie) {
      deleteDetail(item.IdDetalle, (error, response) => {
        let detailsTemp = detailsCookie.filter(detail => detail.ProductoAux !== item.ProductoAux)
        setDetailsCookie(detailsTemp)
      })
    } else {
      let detailsTemp = detailsCookie.filter(detail => detail.ProductoAux !== item.ProductoAux)
      setDetailsCookie(detailsTemp)
    }
  }

  const handlePurchase = async () => {
    if (!userCookie) {
      addToast('Debes iniciar sesión para realizar una compra', 'error')
      return false
    }

    try {
      const newCart = await checkCartFull(userCookie.Id)

      if (!newCart) {
        const newDetails = cookie.get('details')
        setDetailsCookie(newDetails)
        addToast('No hay suficiente stock en algun produco de tu carrito', 'error')
        return false
      }
    } catch (error) {
      addToast('Ha ocurrido un erro inseperado', 'error')
      return false
    }

    if (detailsCookie.length === 0) {
      addToast('No hay productos en tu carrito', 'error')
      return false
    }
    navigate('/caja')
  }

  return (
    <div className='container-cart-page'>
      {loading ? <div className='loader' aria-label="El carrito se está actualizando"></div> :
      <React.Fragment>
      <div className='container-cart'>
        <h1>Carrito</h1>
        {detailsCookie.length > 0 ? <button className='button-hover' onClick={handleEmptyCart}>Vaciar carrito</button> : ''}
        {detailsCookie.length === 0 ? <div className='cart-empty'>No hay productos en tu carrito</div> :
        <div className='cart-items'>
          {detailsCookie.map((item, index) => (<CartItem key={item.ProductoAux} item={item} 
          handleRemoveItem={handleRemoveItem} userCookie={userCookie} detailsCookie={detailsCookie} index={index}
          setDetailsCookie={setDetailsCookie} addToast={addToast}/>))}
        </div>}
      </div>
      <div className='container-pricing'>
        <h3>Subtotal</h3>
        { cartCookie.Descuento && cartCookie.Descuento > 0 ? 
        <><div className='subtotal'>Subtotal: {totalPrice - totalPrice * (parseFloat(cartCookie.Descuento) * 100)} €</div>
        <div className='discount'>Descuento: {cartCookie.Descuento}%</div></> :
        <div className='subtotal-purchased'>Subtotal: {totalPrice.toFixed(2)} €</div>}
        <button className='button-hover' onClick={handlePurchase}>Realizar compra</button>
      </div>
      </React.Fragment>}
    </div>
  )
}