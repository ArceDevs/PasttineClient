import Cookies from 'universal-cookie'
import { calcPrice } from '../exports/calcPrice'
import { updateDetail, getCartFullUser, insertDetail, getCheckedCart } from '../controller/cart.controller'

const cookie = new Cookies()

export async function updateDetailsCookie(product, offers) {
  let details = cookie.get('details')
  let cart = cookie.get('cart')
  let user = cookie.get('user')

  console.log(product.Iva)
  
  let detailTemp = {
    IdDetalle: 0,
    ProductoAux: product.ProductoAux ? product.ProductoAux : product.Id,
    Cantidad: product.Cantidad,
    Precio: product.Precio,
    PrecioDetalle: product.PrecioDetalle,
    CarritoAux: cart.Id,
    Nombre: product.Nombre,
    Img: product.Img,
    Signo: product.Signo,
    Stock: product.Stock,
    Iva: product.Iva || product.IVA,
    Raciones: product.Raciones,
    RacionComprada: product.RacionComprada
  }

  if (offers !== undefined) detailTemp.ofertas = JSON.stringify(offers)
  else detailTemp.ofertas = product.OfertasInfo

  if (product.Stock < 1) return false
  if (user) return detailBBDD(details, detailTemp, product, user, cart)
  else return detailCookie(details, detailTemp, product)
}

function detailCookie(details, detailTemp, product) {
  if (details && details.length > 0) {
    const index = details.findIndex(item => item.ProductoAux === product.Id)
    if (index === -1) {
      details.push(detailTemp)
    } else {
      if (details[index].Cantidad >= product.Stock) return false
      const indexRacion = details.findIndex(item => item.ProductoAux === product.Id && item.RacionComprada == product.RacionComprada)
      if (indexRacion === -1) details[index].Cantidad = parseInt(product.Cantidad)
      else details[index].Cantidad = parseInt(details[index].Cantidad) + parseInt(product.Cantidad)
    }
    cookie.set('details', details, { path: '/' })
    return true
  }
  cookie.set('details', [detailTemp], { path: '/' })
  return true
}

async function detailBBDD(details, detailTemp, product, user, cart) {
  try {
    const response = await getCartFullUser(user.Id)
    if (response.status === 200) {
      cart = response.data.data.Carrito
      details = response.data.data.Detalles
    } else if (response.status === 206) {
      cart = response.data.data.Carrito
      details = []
    } else {
      cart = []
      details = []
    }

    if (details && details.length > 0) {
      const index = details.findIndex(item => item.ProductoAux === product.Id)
      if (index === -1) {
        const detail = await insertDetail(user.Id, detailTemp)
        detailTemp.IdDetalle = detail.IdDetalle
        details.push(detailTemp)
        cookie.set('details', details, { path: '/' })
        return true
      } else {
        if (details[index].Cantidad > product.Stock) return false
        const indexRacion = details.findIndex(item => item.ProductoAux === product.Id && item.RacionComprada == product.RacionComprada)
        if (indexRacion === -1) details[index].Cantidad = parseInt(product.Cantidad)
        else details[index].Cantidad = parseInt(details[index].Cantidad) + parseInt(product.Cantidad)
        details[index].RacionComprada = product.RacionComprada
        details[index].PrecioDetalle = product.PrecioDetalle
        await updateDetail(details[index])
        cookie.set('details', details, { path: '/' })
        return true
      }
    } else {
      const detail = await insertDetail(user.Id, detailTemp)
      detailTemp.IdDetalle = detail.IdDetalle
      details.push(detailTemp)
      cookie.set('details', details, { path: '/' })
      return true
    }
  } catch (error) {
    return false
  }
}

export function updateCartCookie(details) {
  let priceCart = 0
  if (details && details.length > 0) {
    details.forEach(detail => {
      priceCart += (calcPrice(detail.Precio, detail.ofertas) * parseFloat(detail.Cantidad))
    })
  }

  let cart = cookie.get('cart')
  if (cart !== undefined && cart.Precio !== undefined) {
    cart.Precio = priceCart
    cookie.set('cart', cart, { path: '/' })
  } else {
    const cartTemp = {
      Id: 0,
      Precio: priceCart,
      UsuarioAux: 0,
      Estado: 0
    }
    cookie.set('cart', cartTemp, { path: '/' })
  }
}


export async function checkCartFull(userId) {
  try {
    const response = await getCheckedCart(userId)

    if (response.status === 200) {
      cookie.set('cart', response.data.Carrito, { path: '/' })
      cookie.set('details', response.data.Detalles, { path: '/' })
      return false
    }
    return true
  } catch {
    return false
  }
}