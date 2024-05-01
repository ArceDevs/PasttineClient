import axios from 'axios'
import API_CONFIG from './api.config'

const baseUrl = API_CONFIG.BASE_URL+'purchase'

export async function createFactura(userId) {
  
  try {
    const response = await axios({
      url: `${baseUrl}/${userId}`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN
      }
    })

    return response
  } catch (error) {
    throw error
  }
}

export async function getPurchaseData(userId) {
  try {
    const response = await axios({
      url: `${baseUrl}/data/${userId}`,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}

export async function patchEstado(id, estado) {
  
  try {
    const response = await axios({
      url: `${baseUrl}/${id}`,
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: { estado: estado }
    })

    return response
  } catch (error) {
    throw error
  }
}

export async function patchEstadoUser(userId, estado) {
  
  try {
    const response = await axios({
      url: `${baseUrl}/user/${userId}`,
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: { estado: estado }
    })

    return response
  } catch (error) {
    throw error
  }
}

export async function purchaseEnd(userId, facturaId) {
  
  try {
    const response = await axios({
      url: `${baseUrl}/end/${facturaId}`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json'
      }, data: { usuarioAux: userId }
    })

    return response
  } catch (error) {
    throw error
  }
}