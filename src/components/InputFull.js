import React from 'react'
import '../styles/components/inputFull.css'

export default function InputFull({ input, label, id, type, placeholder, pattern, value, action, name }) {
  if(input){
    return (
      <div className='input-full-box'>
        <label htmlFor={id}>{label}</label>
        <textarea id={id} value={value} name={name} {...action}/>
      </div>
    )
  }
  return (
    <div className='input-full-box'>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} name={name} pattern={pattern} placeholder={placeholder} value={value} {...action}/>
    </div>
  )
}
