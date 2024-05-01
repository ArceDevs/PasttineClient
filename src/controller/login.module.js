import axios from 'axios'
import API_CONFIG from './api.config'

const baseUrl = API_CONFIG.BASE_URL+'auth'

export async function loginAsync(data) {
  const formData = new FormData()
  formData.append('email', data.email)
  formData.append('password', data.password)
  try {
    const response = await axios({
      url: `${baseUrl}/login`,
      method: 'POST',
      headers: { 
        'Authorization': 'Bearer '+API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json'
      }, data: formData
    })

    return response
  } catch (error) {
    return false
  }
}

export function login(data, callback) {
  const formData = new FormData()
  formData.append('email', data.email)
  formData.append('password', data.password)

  axios({
    url: `${baseUrl}/login`,
    method: 'POST',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN,
      'Content-Type': 'application/json'
    }, data: formData
  })
  .then(response => {
    if (response.status === 200){
      const user = response.data.data
      callback(null, user)
    } else {
      callback(new Error('Invalid response'))
    }
  })
  .catch(error => {
    callback(error)
  })
}

export async function registerUser(user) {
  const userData = {
    username: user.username,
    email: user.email,
    contrasena: user.password,
    nombre: user.firstname,
    apellido: user.lastname
  }

  try {
    const response = await axios({
      url: `${baseUrl}/register`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: userData
    })

    return response
  } catch (error) {
    throw error
  }
}

export async function registerConfirmation(email) {
  try {
    const response = await axios({
      url: `${baseUrl}/register/confirmation`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: { email: email }
    })
    return response
  } catch (error) {
    throw error
  }
}

export async function patchUserData(data) {
  const userData = { }

  if (data.firstname) userData.nombre = data.firstname
  if (data.lastname) userData.apellido = data.lastname
  if (data.username) userData.username = data.username
  if (data.phone) userData.telefono = data.phone
  if (data.birthDate) userData.fechaNac = data.birthDate

  try {
    const response = await axios({
      url: `${baseUrl}/user`,
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: userData
    })

    return response
  } catch (error) {
    throw error
  }
}