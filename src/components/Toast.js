import React from 'react'
import '../styles/components/toast.css'

const Toast = ({ message, type }) => (
  <div className={`toast toast-${type}`}>
    {message}
  </div>
)

export default Toast