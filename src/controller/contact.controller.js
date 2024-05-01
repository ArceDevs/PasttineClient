import axios from 'axios'
import API_CONFIG from './api.config'

const baseUrl = API_CONFIG.BASE_URL+'contact'

export function sendEmail(idEmail, callback) {
  axios({
    url: `${API_CONFIG.BASE_URL}send-email/`+idEmail,
    method: 'GET',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
    }
  })
  .then(response => {
    if (response.status === 200){
      callback(null, true)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export async function sendEmailAsync(idEmail) {
  try {
    const response = await axios({
      url: `${API_CONFIG.BASE_URL}send-email/`+idEmail,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN
      }
    })

    return response
  } catch (error) {
    throw error
  }
}

export async function insertContact(mail) {
  const data = {
    asunto: mail.subject,
    mensaje: mail.message,
    nombreCompleto: mail.fullName,
    email: mail.email,
    telefono: mail.phone
  }

  try {
    const response = await axios({
      url: `${baseUrl}`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: data
    })

    if (response.status === 201) {
      console.log(response.data)
      return response.data
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}