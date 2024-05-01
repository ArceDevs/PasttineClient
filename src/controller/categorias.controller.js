import axios from 'axios'
import API_CONFIG from './api.config'

const baseUrl = API_CONFIG.BASE_URL+'categorias'

export async function getCategorias() {
    const result = await axios({
      url: `${baseUrl}`,
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer '+API_CONFIG.API_TOKEN
      }
    }).then(r => {
      return r

    }).catch(e => {
      return e.response
      
    });
    return result
}
