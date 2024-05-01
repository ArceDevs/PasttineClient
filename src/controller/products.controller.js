import axios from 'axios'
import API_CONFIG from './api.config'
import { useEffect, useState } from 'react'

const baseUrl = API_CONFIG.BASE_URL+'products'

export function useProductSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setProducts([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(null)
    let cancel

    let queryCopy = { ...query }

    if (!('minValue' in queryCopy)) queryCopy.minValue = 0
    if (!('maxValue' in queryCopy)) queryCopy.maxValue = 10000
    if (!('limit' in queryCopy)) queryCopy.limit = 20
    if (!('page' in queryCopy)) queryCopy.page = 1
    if (!('categoria' in queryCopy)) queryCopy.categoria = 0 // Niguna categoria
  
    const searchAlergenos = queryCopy.alergenos?.map(alergeno => alergeno.Id) || []
    const parameters = {
      ...queryCopy.search && { search: queryCopy.search },
      limit: queryCopy.limit,
      min: queryCopy.minValue,
      max: queryCopy.maxValue,
      page: pageNumber,
      categoria: queryCopy.categoria,
      ...searchAlergenos.length > 0 && { alergenos: searchAlergenos },
      ...queryCopy.excluir && { excluir: queryCopy.excluir },
      ...queryCopy.ofertas && { ofertas: queryCopy.ofertas }
    }

    axios({
      method: 'GET', url: baseUrl, params: parameters,
      headers: { 'Authorization': 'Bearer '+API_CONFIG.API_TOKEN },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
       if (response.data.status === 404) {
        setError(`Desgraciadamente no tenemos más 😥, puedes contactar con nosotros a pasttine.contact@gmail.com y podemos considerar añadir tus sugerencias a nuestro catalogo 😉`)
        setHasMore(false)
      } else if (response.data.validation === 'Negative') {
        setError('Producto buscado invalido')
        setHasMore(false)
      } else if (response.status === 200) {
        setProducts(prevProducts => {
          return [...new Set([...prevProducts, ...response.data.data.map(b => b)])]
        })
        setHasMore(response.data.data.length > 0)
      } else {
        setError('Algo ha salido mal ... 🤐')
      }
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      if (axios.isCancel(e)) return
      if (e.response && e.response.status === 404) {
        setHasMore(false)
        setError(`Desgraciadamente no tenemos más 😥, puedes contactar con nosotros a pasttine.contact@gmail.com y podemos considerar añadir tus sugerencias a nuestro catalogo 😉`)
      } else {
        setError('Algo ha salido mal ... 🤐')
      }
    })

    return () => cancel()
  }, [query, pageNumber])
  // console.log(products)
  return { loading, error, products, hasMore }
}

export function useProduct(id) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [product, setProduct] = useState(undefined)

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios({
      method: 'GET', url: baseUrl+'/'+id,
      headers: { 'Authorization': 'Bearer '+API_CONFIG.API_TOKEN }
    }).then(response => {
      if (response.status === 200) {
        if (response.data.data.length === 0) setError('Algo ha salido mal ... 🤐')
        else setProduct(response.data.data[0])
      } else {
        setError('Algo ha salido mal ... 🤐')
      }
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      setError('Algo ha salido mal ... 🤐')
    })
  }, [id])
  return { loading, error, product }
}

export function useProductIngredients(id) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios({
      method: 'GET', url: baseUrl+'/ingredients/'+id,
      headers: { 'Authorization': 'Bearer '+API_CONFIG.API_TOKEN }
    }).then(response => {
      if (response.status === 200) {
        setIngredients(response.data.data)
      } else {
        setError('Algo ha salido mal ... 🤐')
      }
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      setError('Algo ha salido mal ... 🤐')
    })
  }, [id])
  return { loading, error, ingredients }
}

export function useProductAlergenos(id) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [alergenos, setAlergenos] = useState([])

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios({
      method: 'GET', url: baseUrl+'/alergenos/'+id,
      headers: { 'Authorization': 'Bearer '+API_CONFIG.API_TOKEN }
    }).then(response => {
      if (response.status === 200) {
        setAlergenos(response.data.data)
      } else {
        setError('Algo ha salido mal ... 🤐')
      }
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      setError('Algo ha salido mal ... 🤐')
    })
  }, [id])
  return { loading, error, alergenos }
}


export function useProductOffers(id) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [offers, setOffers] = useState([])

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios({
      method: 'GET', url: baseUrl+'/offers/'+id,
      headers: { 'Authorization': 'Bearer '+API_CONFIG.API_TOKEN }
    }).then(response => {
      if (response.status === 200) {
        setOffers(response.data.data)
      } else {
        setError('Algo ha salido mal ... 🤐')
      }
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      setError('Algo ha salido mal ... 🤐')
    })
  }, [id])
  return { loading, error, offers }
}
