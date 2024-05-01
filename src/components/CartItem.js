import React, { useState, useEffect } from "react"
import API_CONFIG from '../controller/api.config'
import InputQuantity from '../components/InputQuantity'
import { NavLink } from 'react-router-dom'
import { patchDetailQuantityAsync } from '../controller/cart.controller'
import debounce from '../exports/debounce'

export default function CartItem({ item, userCookie, detailsCookie, setDetailsCookie, handleRemoveItem, addToast, index }) {
  const [quantity, setQuantity] = useState(item.Cantidad)
  const [loading, setLoading] = useState(false)
  const img = JSON.parse(item.Img)
  
  const handleChangeQuantity = debounce(async (item) => {
    setLoading(true)
    let detailsTmp = [...detailsCookie]
    if (userCookie) {
      try {
        const response = await patchDetailQuantityAsync(item.IdDetalle, item.Cantidad)
        if (response.status === 204) {
          detailsTmp[index].Cantidad = item.Cantidad
        } else {
          addToast('Ha ocurrido un error inesperado', 'error')
        }
      } catch (error) {
        addToast('Ha ocurrido un error inesperado', 'error')
      }
    } else {
      detailsTmp[index].Cantidad = item.Cantidad
    }
    setLoading(false)
    setDetailsCookie(detailsTmp)
  }, 300)

  useEffect(() => {
    if (item.Cantidad !== quantity) {
      handleChangeQuantity({ IdDetalle: item.IdDetalle, ProductoAux: item.ProductoAux, Cantidad: quantity})
    }
  }, [quantity])

  return (
    <div className='item-cart'>
        <div className='item-img'>
          <NavLink to={`/productos/${item.Nombre}/${item.ProductoAux}`}>
            <img src={API_CONFIG.BASE_URL+img.Small} alt={item.Nombre} />
          </NavLink>
        </div>
      {loading ? <div className='loader' aria-label="Los datos están guardando"></div> : 
        <div className='item-info'>
          <div className='item-text'>
            <div className='item-title'>
              <h4>{item.Nombre}</h4>
              <div className='item-stock'>
                {item.Stock > 0 ? <p>En stock</p> : <p>Sin stock</p>}
              </div>
            </div>
            <div className='item-price'>
              <span className="money">{(item.PrecioDetalle).toFixed(2)} <span className='card-money-sign'>{item.Signo}</span></span>
              <span>{item.Iva ? item.Iva : item.IVA}% IVA</span>
            </div>
          </div>
          <div className='item-interaction'>
            <InputQuantity quantity={quantity} stock={item.Stock} setQuantity={setQuantity} />
            <div className='item-delete'>
              <button onClick={() => handleRemoveItem({ IdDetalle: item.IdDetalle, ProductoAux: item.ProductoAux })}>Eliminar</button>
            </div>
          </div>
        </div>}
    </div>
  )
}
