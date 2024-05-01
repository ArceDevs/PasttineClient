import React, { useState } from 'react'

const ToastContext = React.createContext()

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(toasts => [...toasts, { id, message, type }])
    setTimeout(() => removeToast(id), 3000)
  }

  const removeToast = id => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export { ToastContext, ToastProvider }