import React from 'react'
import '../styles/components/inputStyle.css'

export default function Input({ label, id, type, pattern, value, action, errorMessage, maxLength, defaultValue, placeholder }) {
  if (defaultValue) {
    return (
      <div className='input-box'>
        <input id={id} type={type} pattern={pattern} defaultValue={defaultValue} {...action} placeholder={placeholder} maxLength={maxLength}/>
        <label htmlFor={id}>{label}</label>
        <div className='errorMessage'>{errorMessage}</div>
      </div>
    )
  }
  return (
    <div className='input-box'>
      <input id={id} type={type} pattern={pattern} value={value} {...action} placeholder={placeholder} maxLength={maxLength}/>
      <label htmlFor={id}>{label}</label>
      <div className='errorMessage'>{errorMessage}</div>
    </div>
  )
}
