import React, { useState, useEffect } from 'react'
import '../styles/components/dinamicCards.css'
import { useProductSearch } from '../controller/products.controller'
import { NavLink } from 'react-router-dom'
import API_CONFIG from '../controller/api.config'


export default function DinamicCards() {
  const [query, setQuery] = useState({})
  const { products, loading } = useProductSearch(query, 1)
  const [CardsSection, setCardsSection] = useState(null)

  useEffect(() => {
    const newQuery = {
      categoria: 4, //Pasteles y Tartas
      limit: 15
    }
    setQuery(newQuery)
  }, [])

  useEffect(() => {
    if (products && products.length > 0 && products[0].Img !== undefined) {
      const TopOne = products.slice(0, 1)
      const TopFour = products.slice(1, 5)
      const infiniteScroll = [...products.slice(5, 15),...products.slice(5, 15)]
      const img1 = JSON.parse(TopOne[0].Img)
      setCardsSection(
        <React.Fragment>
          <section className='trending-cards'>
          <h3 className='h3-style'>Trending</h3>
          <div className='main-cards'>
            <div className='top-cards'>
              <div className='cube-cards'>
                {TopFour.map(function(product) {
                  const img = JSON.parse(product.Img)
                  return (
                  <div key={`top-4-${product.Id}`}>
                  <NavLink to={`/productos/${product.Nombre}/${product.Id}`}>
                    <img src={API_CONFIG.BASE_URL+img.Medium} alt={product.Nombre}/>
                    <span>{product.Nombre}</span>
                  </NavLink>
                  </div>)
                })}
              </div>
              <div className='unique-card'>
                <div>
                  <NavLink to={`/productos/${TopOne[0].nombre}/${TopOne[0].Id}`}>
                    <img src={API_CONFIG.BASE_URL+img1.Big} alt={TopOne[0].Nombre}/>
                    <span>{TopOne[0].Nombre}</span>
                  </NavLink>
                  </div>
              </div>
            </div>
            <div className='bottom-cards'>
              <div className='inner-bottom'>
                {infiniteScroll.map(function(product,index) {
                  const img = JSON.parse(product.Img)
                  return (
                    <div key={`infinite-${index}-${product.Id}`}>
                    <NavLink to={`/productos/${product.Nombre}/${product.Id}`}>
                      <img src={API_CONFIG.BASE_URL+img.Small} alt={product.Nombre}/>
                      <span>{product.Nombre}</span>
                    </NavLink>
                  </div>)
                })}
              </div>
            </div>
          </div>
          </section>
        </React.Fragment>
      )
    }
  }, [products])

  return CardsSection
}
