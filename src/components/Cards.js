import React, { forwardRef, useContext } from 'react'
import '../styles/components/cards.css'
import { BsCartPlusFill } from "react-icons/bs"
import { NavLink } from 'react-router-dom'
import API_CONFIG from '../controller/api.config'
import { calcPrice } from '../exports/calcPrice'
import { updateDetailsCookie } from '../exports/updateCart'
import { ToastContext } from '../exports/toaster'

const Cards = forwardRef(({ products }, ref) => {
  const { addToast } = useContext(ToastContext)

  const addToCart = async (event, product, precioFinal, precioReducido) => {
    event.preventDefault()
    event.stopPropagation()
  
    product.RacionComprada = false
    product.Cantidad = 1
    product.PrecioDetalle = precioReducido !== 0 ? precioReducido : precioFinal

    try {
      const added = await updateDetailsCookie(product, product.OfertasInfo)
      if (added) addToast('Producto añadido al carrito', 'success')
      else addToast('Producto agotado', 'error')
    } catch (error) {
      addToast('Error al añadir al carrito', 'error')
    }
  }

  const products_shown = products.map(function(product, index) {
    const img = JSON.parse(product.Img)
    let calc = {
      Precio: product.Precio,
      IVA: product.Iva,
      Raciones: 0
    }
    const precioFinal = calcPrice(calc)
    var precioReducido = 0
    if (product.OfertasInfo !== null && product.OfertasInfo !== undefined && product.OfertasInfo !== '') {
      precioReducido = calcPrice(calc, JSON.parse(product.OfertasInfo))
    }

    return (
    <NavLink to={`/productos/${product.Nombre}/${product.Id}`} key={`product-${product.Id}`}>
    <div ref={index+1 === products.length ? ref : null} className='item'>
      <div className='subtitle'><h4>{product.Nombre}</h4></div>
      <p>{precioReducido !== 0 ? <>{(precioReducido).toFixed(2)} <span className='previous-price'>{(precioFinal).toFixed(2)}</span></> : `${(precioFinal).toFixed(2)}`} <span className='card-money-sign'>{product.Signo}</span></p>
      <button className='btn-buy' onClick={(event) => addToCart(event, product, precioFinal, precioReducido)}><BsCartPlusFill className='buy'/></button>
      <img src={API_CONFIG.BASE_URL+img.Small} alt={product.Nombre}/>
      {parseInt(product.Stock) <= 0 ? <div className='out-of-stock'>Agotado</div> : null}
    </div>
  </NavLink>)
  })

  return (
    <div className='cards-container'>
      {products_shown}
    </div>
  )
})

export default Cards
