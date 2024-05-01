import React from "react"
import '../styles/components/inputQuantity.css'

export default function InputQuantity({ quantity, setQuantity, stock }) {

  const handleQuantityAdd = (e) => {
    if (quantity < stock) setQuantity(quantity + 1)
  }

  const handleQuantityRemove = (e) => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleQuantity = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) {
      if (stock < value) {
        setQuantity(stock)
      } else if (value < 1) {
        setQuantity(1)
      } else {
        setQuantity(parseInt(value, 10))
      }
    } else if (value === '') {
      setQuantity(1)
    }
  }

  return (
    <React.Fragment>
    {stock < 1 ? <div className='out-of-stock'>Sin stock</div> :
    <div className='quantity'>
      <button type='button' className='add-btn' onClick={handleQuantityAdd}></button>
      <input type='text' className='numeric' placeholder='¿Cuántos?' 
      value={quantity} onChange={handleQuantity} inputMode='numeric' 
      maxLength='4' onFocus={(e) => e.target.select()} onClick={(e) => e.target.select()}/>
      <button type='button' className='add-btn rotate-180' onClick={handleQuantityRemove}></button>
    </div>}
    </React.Fragment>
  )
}