import React, { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { BsCartPlusFill, BsPerson } from 'react-icons/bs'
import Logo from '../assets/logo.png'
import '../styles/components/headerStyle.css'
import API_CONFIG from '../controller/api.config'

export default function Header({ user, removeSession }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <React.Fragment>
    <header className='header'>
      <menu className='navigation'>
        <button className='hamburger-icon' onClick={toggleMenu}><span></span></button>
        <NavLink to='/cart' className='cart-responsive img-page'><BsCartPlusFill className={`buy-pink nav-button ${location.pathname === '/cart' ? 'active-page-cart' : ''}`} size={45}/></NavLink>
        <NavLink to='/' className='logo'><div><img src={Logo} alt='pasttine' /></div></NavLink>
        <ul className='navigation-list'>
          <div className='navigation-items navigation-hover'>
            <li><NavLink to='/home' className={location.pathname === '/home' ? 'active-page' : ''}>Inicio</NavLink></li>
            <li><NavLink to='/productos' className={location.pathname === '/productos' ? 'active-page' : ''}>Productos</NavLink></li>
            <li><NavLink to='/contacto' className={location.pathname === '/contacto' ? 'active-page' : ''}>Contacto</NavLink></li>
          </div>
          <div className='navigation-items userLog'>
            <li><NavLink to='/cart' className='img-page'><BsCartPlusFill className={`buy-pink nav-button ${location.pathname === '/cart' ? 'active-page-cart' : ''}`} size={45}/></NavLink></li>
            {user ? 
            <React.Fragment>
              <li><NavLink to='/perfil' className='img-page'>
                {user.PFP ? 
              <img src={API_CONFIG.BASE_URL+user.PFP} className='profile-pic' alt='PFP' /> : 
              <BsPerson className='nav-button' size={45}/>}
              </NavLink></li>
              <li><a href='' onClick={removeSession}>Logout</a></li>
            </React.Fragment> : 
            <li><NavLink to='/login' className={location.pathname === '/login' ? 'active-page' : ''}>Login</NavLink></li>}
          </div>
          <li className='d-none'><NavLink to='/error'>Error</NavLink></li>
        </ul>

        <nav className={`navigation-list-responsive ${isMenuOpen ? 'active' : ''}`}>
          <div className='navigation-top-responsive'>
            {user ? 
            <div className='profile-responsive'><NavLink to='/perfil' className='img-page' onClick={toggleMenu}>
              {user.PFP ? 
              <img src={API_CONFIG.BASE_URL+user.PFP} className='profile-pic' alt='PFP' /> : 
              <BsPerson className='nav-button' size={45}/>}
            </NavLink> 
            <li><a href='' onClick={removeSession}>Logout</a></li></div> : 
            <div className='profile-responsive'>
              <NavLink to='/login' onClick={toggleMenu}><BsPerson className='nav-button' size={45}/></NavLink>
              <li><NavLink to='/login' className={location.pathname === '/login' ? 'active-page' : ''} onClick={toggleMenu}>Login</NavLink></li>
            </div>}
            <button className='close-menu' onClick={toggleMenu}></button>
          </div>
          <ul>
            <li><NavLink to='/home' className={location.pathname === '/home' ? 'active-page' : ''} onClick={toggleMenu}>Inicio</NavLink></li>
            <li><NavLink to='/productos' className={location.pathname === '/productos' ? 'active-page' : ''} onClick={toggleMenu}>Productos</NavLink></li>
            <li><NavLink to='/contacto' className={location.pathname === '/contacto' ? 'active-page' : ''} onClick={toggleMenu}>Contacto</NavLink></li>
            <li><NavLink to='/cart' className={location.pathname === '/cart' ? 'active-page' : ''} onClick={toggleMenu}>Carrito</NavLink></li>
            {user ? <li><NavLink to='/perfil' className={location.pathname === '/perfil' ? 'active-page' : ''} onClick={toggleMenu}>Perfil</NavLink></li> : ''}
          </ul>
        </nav>
      </menu>
    </header>
    <Breadcrumbs />
    </React.Fragment>
  )
}