import axios from 'axios'
import API_CONFIG from './api.config'
import { useState, useEffect } from 'react'

const baseUrl = API_CONFIG.BASE_URL+'invoice'

export function useInvoice(userId) {
  const [loadingForm, setLoadingForm] = useState(true)
  const [purchaseData, setPurchaseData] = useState({})
  const [error, setError] = useState(null)

  const defaultData = {
    address: '',
    address2: '',
    province: '',
    phone: '',
    cp: '',
    remember: false
  }

  useEffect(() => {
    setLoadingForm(true)
    setError(null)

    axios({
      method: 'GET', url: `${baseUrl}/user/${userId}`,
      headers: { 'Authorization': 'Bearer '+API_CONFIG.API_TOKEN }
    }).then(response => {
      if (response.status === 200) {
        setPurchaseData(response.data.data)
      }
      else {
        setPurchaseData(defaultData)
      }
      setLoadingForm(false)
    }).catch(e => {
      setLoadingForm(false)
      setPurchaseData(defaultData)
    })
  }, [userId])
  return { loadingForm, error, purchaseData }
}

export async function getInvoiceUser(userId) {
  const defaultData = {
    Id: 0,
    UsuarioAux: '',
    DetallesFacturaAux: '',
    Provincia: '',
    Direccion: '',
    Direccion2: '',
    Cp: '',
    Telefono: '',
    Recordar: false
  }

  try {
    const response = await axios({
      method: 'GET', url: `${baseUrl}/user/${userId}`,
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN
      }
    })

    if (response.status === 200 && response.data.Recordar) return response.data
    return defaultData
  } catch (error) {
    return defaultData
  }
}

export async function patchInvoiceUser(userData) {
  const formData = {
    direccion: userData.address,
    cp: userData.cp,
    provincia: userData.province,
    telefono: userData.phone,
    recordar: userData.remember
  }
  if (userData.address2 || userData.address2 != '') formData["direccion2"] = userData.address2
  try {
    const response = await axios({
      url: `${baseUrl}/user/${userData.userId}`,
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + API_CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      }, data: formData
    })

    return response
  } catch (error) {
    throw error
  }
}