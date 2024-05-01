import axios from 'axios'
import API_CONFIG from './api.config'

const baseUrl = API_CONFIG.BASE_URL+'code'

export async function postEmail(email) {
  try {
    const response = await axios({
      url: `${baseUrl}/email`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json'
      }, data: { email: email }
    })
    return response
  } catch (error) {
    throw error
  }
}

export async function codeCompare(id, code) {
  try {
    const response = await axios({
      url: `${baseUrl}/compare/${id}`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: { codigo: code }
    })
    return response
  } catch (error) {
    throw error
  }
}