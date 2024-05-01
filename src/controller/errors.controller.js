import axios from 'axios'
import API_CONFIG from './api.config'

const baseUrl = API_CONFIG.BASE_URL+'errors'

export function handleError(params) {
  const params = {
    mensaje: params.message,
    error: params.error,
    ruta: params.route,
    metodo: params.method,
    usuarioAux: params.user
  }

  axios({
    url: `${baseUrl}`,
    method: 'POST',
    headers: { 
      'Authorization': 'Bearer '+API_CONFIG.API_TOKEN,
      'Content-Type': 'application/json'
    }, data: params
  })
}