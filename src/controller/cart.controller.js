import axios from 'axios'
import API_CONFIG from './api.config'

const baseUrl = API_CONFIG.BASE_URL+'cart'

/* INSERT / CREATE */

export function createCart(usuarioAux, callback) {
  const formData = new FormData()
  formData.append('usuarioAux', usuarioAux)

  axios({
    url: `${baseUrl}`,
    method: 'POST',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN,
      'Content-Type': 'application/json'
    }, data: formData
  })
  .then(response => {
    if (response.status === 201){
      const cart = response.data.Id
      callback(null, cart)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export async function insertDetail(userId, detail) {
  const formData = new FormData()
  formData.append('productoAux', detail.ProductoAux)
  formData.append('carritoAux', detail.CarritoAux)
  formData.append('cantidad', detail.Cantidad)
  formData.append('racionComprada', detail.RacionComprada)
  formData.append('precioDetalle', detail.PrecioDetalle)
  formData.append('usuarioAux', userId)

  try {
    const response = await axios({
      url: `${baseUrl}/details`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      },
      data: formData,
    })

    if (response.status === 201) {
      return response.data
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}

export function insertDetailUser(userId, detail, callback) {
  const formData = new FormData()
  formData.append('productoAux', detail.ProductoAux)
  formData.append('carritoAux', detail.CarritoAux)
  formData.append('cantidad', detail.Cantidad)
  formData.append('racionComprada', detail.RacionComprada)
  formData.append('precioDetalle', detail.PrecioDetalle)

  axios({
    url: `${baseUrl}/details/user/`+userId,
    method: 'POST',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN,
      'Content-Type': 'application/json'
    }, data: formData
  })
  .then(response => {
    if (response.status === 201){
      const cart = response.data.data[0]
      callback(null, cart)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

/* DELETE */

export function deleteDetail(detailId, callback) {
  axios({
    url: `${baseUrl}/details/`+detailId,
    method: 'DELETE',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.status === 201){
      callback(null, true)
    } else {
      callback(null, false)
    }
  })
  .catch(error => {
    callback(null, false)
  })
}

/* PATCH */

export function patchCartUser(userId, cart, callback) {
  const formData = new FormData()
  formData.append('total', cart.Total)
  formData.append('promocion', cart.Promocion)

  axios({
    url: `${baseUrl}/user/`+userId,
    method: 'PATCH',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
    }, data: formData
  })
  .then(response => {
    if (response.status === 200){
      const cart = response.data.data[0]
      callback(null, cart)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export function patchDetailQuantity(detailId, quantity, callback) {
  const data = {
    cantidad: quantity
  }

  axios({
    url: `${baseUrl}/details/`+detailId,
    method: 'PATCH',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
    }, data: data
  })
  .then(response => {
    if (response.status === 200){
      callback(null, true)
    } else {
      callback(null, false)
    }
  })
  .catch(error => {
    callback(null, false)
  })
}

export async function patchDetailQuantityAsync(detailId, quantity) {
  try {
    const response = await axios({
      url: `${baseUrl}/details/`+detailId,
      method: 'PATCH',
      headers: { 
        'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
      }, data: { cantidad: quantity }
    })

    return response
  } catch (error) {
    return false
  }
}

export function updateCartFullUser(UsuarioAux, cart, details, callback) {
  const formData = new FormData()
  formData.append('usuarioAux', UsuarioAux)
  formData.append('total', cart.Total)
  formData.append('promocion', cart.Promocion)
  formData.append('detalles', JSON.stringify(details))

  axios({
    url: `${baseUrl}/details/user/`+UsuarioAux,
    method: 'PUT',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
    }, data: formData
  })
  .then(response => {
    if (response.status === 200){
      const cart = response.data.data[0]
      callback(null, cart)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export function patchCart(cart, callback) {
  const data = {
    precio: cart.Precio,
    promocion: cart.Promocion
  }

  axios({
    url: `${baseUrl}/`+cart.Id,
    method: 'PATCH',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN,
      'Content-Type': 'application/json'
    }, data: data
  })
  .then(response => {
    if (response.status === 200){
      callback(null, true)
    } else {
      callback(null, false)
    }
  })
  .catch(error => {
    callback(null, false)
  })
}

export async function updateDetail(detail) {
  const data = {
    cantidad: detail.Cantidad,
    precioDetalle: detail.PrecioDetalle,
    racionComprada: detail.RacionComprada,
    carritoAux: detail.CarritoAux,
    productoAux: detail.ProductoAux
  }

  try {
    const response = await axios({
      url: `${baseUrl}/details/`+detail.IdDetalle,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer '+API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json'
      }, 
      data: data
    })

    if (response.status === 204) {
      return true
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}

export function getCartUser(usuarioAux, callback) {
  axios({
    url: `${baseUrl}/user/`+usuarioAux,
    method: 'GET',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
    }
  })
  .then(response => {
    if (response.status === 200){
      const cart = response.data.data[0]
      callback(null, cart)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export function getDetailsUser(usuarioAux, callback) {
  axios({
    url: `${baseUrl}/details/user/`+usuarioAux,
    method: 'GET',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
    }
  })
  .then(response => {
    if (response.status === 200){
      const details = response.data.data
      callback(null, details)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export function getDetailsCart(cartId, callback) {
  axios({
    url: `${baseUrl}/details/cartAux/`+cartId,
    method: 'GET',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
    }
  })
  .then(response => {
    if (response.status === 200){
      const details = response.data.data
      callback(null, details)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export async function getCheckedCart(userId) {
  try {
    const response = await axios({
      url: `${baseUrl}/check/user/`+userId,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export async function getCartFullUser(userId) {
  try {
    const response = await axios({
      url: `${baseUrl}/full/user/`+userId,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export function getCartFullUserSync(userId, callback) {
  axios({
    url: `${baseUrl}/full/user/`+userId,
    method: 'GET',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
    }
  })
  .then(response => {
    if (response.status === 200 || response.status === 204 || response.status === 206){
      callback(null, response)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export async function emptyCart(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/details/cart/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN
      }
    })

    if (response.status === 204) {
      return response.data
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}
