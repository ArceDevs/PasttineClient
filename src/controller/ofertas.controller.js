import axios from 'axios'
import API_CONFIG from './api.config'
import { useEffect, useState } from 'react'

const baseUrl = API_CONFIG.BASE_URL+'ofertas'

export function useOfertasBanners() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [banners, setBanners] = useState([])

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios({
      method: 'GET', url: baseUrl+'/banner',
      headers: { 'Authorization': 'Bearer '+API_CONFIG.API_TOKEN }
    }).then(response => {
      if (response.status === 200) {
        setBanners(response.data.data)
      } else {
        setError('Algo ha salido mal ... 🤐')
      }
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      setError('Algo ha salido mal ... 🤐')
    })
  }, [])
  return { loading, error, banners }
}


export async function getOfertasTop() {
  try {
    const response = await axios({
      url: baseUrl+'/banner',
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
