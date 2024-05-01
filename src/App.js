import React,{ useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
import Cookies from 'universal-cookie'

import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Reset from './pages/Reset'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Terms from './pages/Terms'
import Error from './pages/Error'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductInfo from './pages/ProductInfo'
import { ToastContext } from './exports/toaster'
import Toast from './components/Toast'

function App() {
  const navigate = useNavigate()
  const cookie = new Cookies()
  const [user, setUser] = useState(cookie.get('user'))
  const { toasts } = useContext(ToastContext)

  const removeSession = () => {
    cookie.remove('user',{path: '/'})
    cookie.remove('cart',{path: '/'})
    cookie.remove('details',{path: '/'})
    setUser(null)
    navigate('/')
  }

  const createSession = (user) => {
    cookie.set('user', user, {path: '/'})
    setUser(user)
  }

  return (
    <>
    <Header user={user} removeSession={removeSession} createSession={createSession} />
    <main className='main-container'>
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/productos' element={<Products />}></Route>
        <Route path='/productos/:name/:id' element={<ProductInfo />}></Route>
        <Route path='/contacto' element={<Contact />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/caja' element={<Checkout />}></Route>
        <Route path='/login' element={<Login createSession={createSession} />}></Route>
        <Route path='/login/reiniciar' element={<Reset />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/perfil' element={<Profile setUser={setUser} />}></Route>
        <Route path='/terminos' element={<Terms />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </main>
    <Footer />
    </>
  )
}

export default App
