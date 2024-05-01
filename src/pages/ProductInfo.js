import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/pages/productInfo.css'
import '../styles/components/buttonHover.css'
import { useProduct, useProductAlergenos, useProductOffers } from '../controller/products.controller'
import API_CONFIG from '../controller/api.config'
import DetailsTable from '../components/DetailsTable'
import InputQuantity from '../components/InputQuantity'
import { calcPrice, calcDiscount } from '../exports/calcPrice'
import { updateDetailsCookie } from '../exports/updateCart'
import { useNavigate  } from 'react-router-dom'
import { ToastContext } from '../exports/toaster'

export default function ProductInfo() {
  const { addToast } = useContext(ToastContext)
  const navigate = useNavigate()

  const { id } = useParams()
  const { loading, error, product } = useProduct(id)
  const { alergenos } = useProductAlergenos(id)
  const { offers } = useProductOffers(id)

  //Prices
  const [productPrice, setProductPrice] = useState(0)
  const [sellPrice, setSellPrice] = useState(0)

  const [quantity, setQuantity] = useState(1)
  const [ingredients, setIngredients] = useState(false)
  const [raciones, setRaciones] = useState(false)
  //Elements
  const [srcSet, setSrcSet] = useState('')
  const [imgProduct, setImgProduct] = useState('')
  const [discountTotal, setDiscountTotal] = useState(0)

  const handleRaciones = (e) => {
    let racionesTemp = raciones
    if (racionesTemp) {
      racionesTemp = false
      setRaciones(false)
    } else { 
      racionesTemp = true
      setRaciones(true)
    }

    if (productPrice !== 0) {
      let calc = {
        Precio: product.Precio,
        IVA: product.IVA,
        Raciones: product.Raciones
      }
      if (racionesTemp === false) calc.Raciones = 0
      setProductPrice(calcPrice(calc))
    }
    console.log(racionesTemp)
  }

  useEffect(() => { 
    if (product !== undefined) {
      const imgProduct = JSON.parse(product.Img)
      setImgProduct(API_CONFIG.BASE_URL+imgProduct.Big)
      setSrcSet(API_CONFIG.BASE_URL+imgProduct.Small+ ' 500w,'+ 
                API_CONFIG.BASE_URL+imgProduct.Medium+ ' 750w,'+ 
                API_CONFIG.BASE_URL+imgProduct.Big+ ' 1200w')
      let calc = {
        Precio: product.Precio,
        IVA: product.IVA,
        Raciones: 0
      }
      setProductPrice(calcPrice(calc))
    }
  }, [product])

  const [imgAlergenos, setImgAlergenos] = useState([])
  useEffect(() => { 
    if (alergenos !== undefined && alergenos.length > 0) {
      setImgAlergenos([...imgAlergenos, ...alergenos.map(alergeno => alergeno.Img)])
    }
  }, [alergenos])

  useEffect(() => { 
    if (productPrice !== undefined && productPrice !== 0) {
      let discount = calcDiscount(productPrice, offers)
      setDiscountTotal(discount)
      if (discount !== 0) setSellPrice(productPrice - discount)
      else setSellPrice(productPrice)
    }
  }, [offers, productPrice])

  const handleAddToCart = (quantity) => async (event) => {
    if (quantity === 0) return
    let productDetail = {
      IdDetalle: 0,
      Id: product.Id,
      ProductoAux: product.Id,
      Cantidad: quantity,
      Precio: product.Precio,
      PrecioDetalle: sellPrice,
      CarritoAux: 0,
      Nombre: product.Nombre,
      Img: product.Img,
      Signo: product.Signo,
      Stock: product.Stock,
      Iva: product.IVA,
      Raciones: product.Raciones,
      RacionComprada: raciones
    }

    try {
      const added = await updateDetailsCookie(productDetail, offers)
      if (added) navigate('/cart')
      else addToast('Producto agotado', 'error')
    } catch (error) {
      addToast('Ha ocurrido un erro inesperado', 'error')
    }
  }

  return (
    <React.Fragment>
    {loading ? <div className='loader' aria-label="El producto está cargando"></div> :
    error ? <div className='error-cards' aria-label="Fallo al cargar el producto">{error}</div> : 
    product ? (
    <div className='product'>
      <h1 className='name-product'>{product.Nombre}</h1>
      <div className='alergenos'>
      {alergenos !== undefined ? alergenos.map(alergeno => <img key={'alergeno-'+alergeno.Id} src={API_CONFIG.BASE_URL+alergeno.Img} alt={alergeno.Nombre}/>) : ''}
      </div>
      <div className='product-info'>
        <div className='container-product'>
          <img src={imgProduct} srcSet={srcSet} alt={product.Nombre}/>
          <p>{product.Ingredientes}</p>
        </div>
        <div className='purchase-description'>
          <div className='container-purchase'>
            <div className='flex'>
              {discountTotal > 0 ? 
              <h2 className='price'>{(sellPrice).toFixed(2)}<span>{product.Signo}</span></h2> : 
              <h2 className='price'>{(productPrice).toFixed(2)}<span>{product.Signo}</span></h2>}
            </div>
            {discountTotal > 0 ? 
            <div className='flex'>
              <h3 className='price-discount'>{(productPrice).toFixed(2)}<span>{product.Signo}</span></h3>
              {discountTotal > 0 ? <div className='discount'>{((discountTotal / productPrice) * 100).toFixed(1)}%</div> : ''}
            </div> : ''}
            <InputQuantity quantity={quantity} stock={product.Stock} setQuantity={setQuantity}/>
            {product.Raciones ?
              <label className='check-box-container' title='Una ración es una octava parte del producto'>
                ¿Quiere pedir el producto en raciones? *
                <input type='checkbox' value={raciones} onChange={handleRaciones}/>
                <span className="checkmark"></span>
              </label> : ''}
            <button className='button-hover' onClick={handleAddToCart(quantity, raciones)}>Añadir al carro</button>
          </div>
          <div className='container-description'>
            <div className='description'>{product.Descripcion}</div>
          </div>
          {product.Peso !== 0 && product.Peso !== null ?
          <React.Fragment>
            <div className='container-peso'>
              <h4>Peso</h4>
              <div className='peso'>{product.Peso}</div>
              {raciones === true ? 
              <React.Fragment>
                <h4>Por ración</h4>
                <div className='peso'>{parseInt(product.Peso) / 8} {product.Signo.split('/')[1]}</div>
              </React.Fragment>
              : ''}
            </div>
          </React.Fragment>
          :''}
        </div>
      </div>
      <div className='container-ingredients'>
        <details className='ingredients-info' onClick={() => !ingredients ? setIngredients(true) : null}>
          <summary>Información Nutricional</summary>
            {ingredients ? <DetailsTable id={id} /> : ''}
         </details>
      </div>
    </div>)
    : null}
    </React.Fragment>
  )
}
