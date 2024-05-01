import axios from 'axios'
import API_CONFIG from './api.config'

const baseUrl = API_CONFIG.BASE_URL+'user'

export async function patchUserData(userData, userId) {
  const newData = {
    nombre: userData.firstname,
    apellido: userData.lastname,
    username: userData.username,
    telefono: userData.phone,
    fechaNac: userData.birthDate
  }
  try {
    const response = await axios({
      url: `${baseUrl}/${userId}`,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: newData
    })

    return response
  } catch (error) {
    throw error
  }
}

export async function patchUserPfp(file, userId) {
  const formData = new FormData()
  formData.append('pfp', file)

  try {
    const response = await axios({
      url: `${baseUrl}/upload/pfp/${userId}`,
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN
      }, data: formData
    })

    return response
  } catch (error) {
    throw error
  }
}

export async function sendCodePassword(userId) {
  try {
    const response = await axios({
      url: `${baseUrl}/password/confirmation/${userId}`,
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

export async function sendCodePasswordEmail(email) {
  try {
    const response = await axios({
      url: `${baseUrl}/password/confirmation/email`,
      method: 'PATCH',
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

export async function updatePassword(newPassword, userId) {
  try {
    const response = await axios({
      url: `${baseUrl}/password/${userId}`,
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: { contrasena: newPassword }
    })
    return response
  } catch (error) {
    throw error
  }
}

export async function updatePasswordEmail(newPassword, email) {
  console.log(newPassword, email)
  try {
    const response = await axios({
      url: `${baseUrl}/password/email`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: { contrasena: newPassword, email: email }
    })
    return response
  } catch (error) {
    throw error
  }
}