import React, { useState, useEffect, useCallback, useRef } from 'react'
import Cards from '../components/Cards'
import { useProductSearch } from '../controller/products.controller'
import { getAlergenos } from '../controller/alergenos.controller'
import { getCategorias } from '../controller/categorias.controller'
import debounce from '../exports/debounce'
//Form style
import '../styles/components/search.css'
import DoubleRange from '../components/DoubleRange'
import MultiSelect from '../components/MultiSelect'
import imgs from '../exports/products'
//Form
import { useForm } from 'react-hook-form'

export default function Products() {
  /***** VARIABLES*****/
  const [searchData, setSearchData] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  //Data
  const [alergenos, setAlergenos] = useState(null)
  const [categorias, setCategorias] = useState(null)
  const [categoriaSelected, setCategoriaSelected] = useState(0)
  //Excluir
  const [excluir, setExcluirData] = useState(false)
  //MultiSelect
  const [selectedOptions, setSelectedOptions] = useState([])
  //Double Range
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(100)
  const [isSearching, setIsSearching] = useState(false)

  /***** CALLBACKS*****/
  const { handleSubmit } = useForm()
  const [query, setQuery] = useState({})
  const { products, hasMore, loading, error } = useProductSearch(query, pageNumber)

  /****************CATEGORIA Y ALERGENOS*************************/
  const fetchAlergenos = useCallback(async () => {
    try {
      const response = await getAlergenos()
      if (response.status === 200) {
        setAlergenos(response.data.data)
      } else {
        setAlergenos(null)
      }
    } catch (error) {
      setAlergenos(null)
    }
  }, [])

  const fetchCategorias = useCallback(async () => {
    try {
      const response = await getCategorias()
      if (response.status === 200) {
        let categoryList = response.data.data.map(function(categoria, i) {
          let button = 
            <button type='radio' 
                key={`category-${categoria.Id}`} data-categoria-id={categoria.Id} title={categoria.Nombre} className='category'
                onClick={() => setCategoriaSelected(categoria.Id)}>
                <img src={imgs[categoria.Id-1]} alt={categoria.Nombre} />
            </button>
          if (i === response.data.data.length-1) {
            return (
              <React.Fragment key={`fragment-${i}`}>
                {button}
              <button type='radio' 
                key="category-Todos" data-categoria-id="0" title="Todos" className='category'
                onClick={() => setCategoriaSelected(0)}>
                <img src={imgs[8]} alt="Todos" />
              </button>
              </React.Fragment>)
          }
          return (button)
        })
        setCategorias(categoryList)
      } else {
        setCategorias(null)
      }
    } catch (error) {
      setCategorias(null)
    }
  }, [])


  useEffect(() => {
    fetchAlergenos()
  }, [])

  useEffect(() => {
    fetchCategorias()
  }, [])
  /*****************************************/

  const observer = useRef()
  const lastProductElementRef = useCallback(node => {
    if (loading || isSearching) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, isSearching])


  //Petiticón a la API
  const getProducts = useCallback(async () => {
    setIsSearching(true)
    setPageNumber(1)
    const newQuery = {
      minValue: minValue,
      maxValue: maxValue,
      search: searchData,
      alergenos: selectedOptions,
      excluir: excluir,
      categoria: categoriaSelected,
      ofertas: true
    }
    setQuery(newQuery)
    setIsSearching(false)
  }, [minValue, maxValue, searchData, selectedOptions, excluir, categoriaSelected])

  //Restrasar la ejecucion de getProducts
  const debouncedGetProducts = debounce(getProducts, 800)

  //Actualizar datos del formulario
  const handleSearchData = (event) => {
    setSearchData(event.target.value)
  }
  const handleCheckboxChange = (event) => {
    setExcluirData(event.target.checked)
  }

  const handleRadioChange = (event) => {
    setCategoriaSelected(event.target.value)
  }

  useEffect(() => {
    debouncedGetProducts()
    return () => {
      debouncedGetProducts.cancel()
    }
  }, [searchData, excluir])

  return (
    <section className='container-products'>
      <form onSubmit={handleSubmit(getProducts)}>
        <div className='search-box'>
          <div className='search-term-box'>
            <input id='search-term' type='text' className='search-term' onKeyUp={handleSearchData} placeholder='¿Qué es lo que prefieres hoy?'/>
          </div>
          <div className='filter-box'>
            <div className='range-box'>
              <DoubleRange minValue={minValue} maxValue={maxValue} setMinValue={setMinValue} setMaxValue={setMaxValue} debounce={debouncedGetProducts}/>
            </div>
            <div className='filter-checks-box'>
              <label className='check-box-container'>
                Excluir producto buscado
                <input type='checkbox' checked={excluir} onChange={handleCheckboxChange}/>
                <span className="checkmark"></span>
              </label>
              <MultiSelect selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} options={alergenos} debounce={debouncedGetProducts}/>
            </div>
          </div>
          <div className='categories-container'>
            {categorias}
            <input type='hidden' id='categoria-selected' onChange={handleRadioChange} value={categoriaSelected} />
          </div>
        </div>
        <button type='submit' className="visually-hidden" id="buscar">Buscar</button>
      </form>
      {products && products !== undefined && products.length > 0 ? (
        <Cards ref={lastProductElementRef} products={products} />
      ) : null}
      {loading ? (
        <div className='loader' aria-label="Los productos estan cargando"></div>
      ) : error ? (
        <div className='error-cards' aria-label="Fallo la carga de los productos">{error}</div>
      ) : null}
      <a href="#root" className="top-arrow" aria-label="Ir a la parte superior de la pantalla">
      <span className="visually-hidden">Ir a la parte superior de la pantalla</span>
      </a>
    </section>
  )
}


