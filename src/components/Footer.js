import React from 'react'
import '../styles/components/footerStyle.css'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/logo.png'


export default function Footer() {
  return (
    <>
    <footer className="footer-section">
        <div className="container-md">
          <div className="footer-cta">
              <div className="single-cta">
                <i className="bi bi-geo-alt-fill"/>
                  <div className="cta-text">
                      <h4>Sobre nosotros</h4>
                      <span><a href='https://www.google.com/maps/place/Ambros%C3%ADa+healthy+FOOD/@40.4362666,-3.7050045,17z/data=!3m1!4b1!4m6!3m5!1s0xd4228f5b032c4ad:0xa4dada09f2c7300d!8m2!3d40.4362625!4d-3.7028105!16s%2Fg%2F11c5h2p3lj'>Gral. Álvarez de Castro, 23</a></span>
                  </div>
              </div>
              <div className="single-cta">
                  <i className="bi bi-phone"></i>
                  <div className="cta-text">
                      <h4>Llamanos</h4>
                      <span>+34 628334045</span>
                  </div>
              </div>
              <div className="single-cta">
                <i className="bi bi-envelope-fill"></i>
                <div className="cta-text">
                    <h4>Contactanos</h4>
                    <span>pasttine.contact@gmail.com</span>
                </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
              <div className="row">
                  <div className="col-xl-4 col-lg-4 mb-50">
                      <div className="footer-widget">
                          <div className="footer-widget-heading">
                              <h3>Sobre nosotros</h3>
                          </div>
                          <div className="footer-text">
                              <p>Somos Pasttine, una pasión por la pastelería hecha realidad. Desde 2023, hemos estado deleitando paladares con exquisitos postres artesanales. Nuestro compromiso es crear momentos dulces y memorables, utilizando ingredientes de la más alta calidad y técnicas tradicionales. En Pasttine, cada pastel, galleta y dulce refleja nuestra dedicación por hacer que cada bocado sea una experiencia inolvidable. Bienvenidos a nuestro mundo de sabor y creatividad.</p>
                          </div>
                          <div className="footer-social-icon">
                              <span>Siguenos</span>
                              <a href="facebook.com" target='_blank' className='facebook-bg'><i className="bi bi-facebook"></i></a>
                              <a href="twitter.com" target='_blank' className='twitter-bg'><i className="bi bi-twitter"></i></a>
                              <a href="instagram.com" target='_blank' className='instagram-bg'><i className="bi bi-instagram"></i></a>
                          </div>
                      </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                      <div className="footer-widget logo-widget">
                        <NavLink to='/' className='logo-lg'><div><img src={Logo} alt='pasttine' /></div></NavLink>
                      </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                      <div className="footer-widget">
                          <div className="footer-widget-heading">
                              <h3>Enlaces de interés</h3>
                          </div>
                          <menu>
                            <ul>
                                <li><NavLink to='/' className='logo-lg'>Home</NavLink></li>
                                <li><NavLink to='/nosotros' className='logo-lg'>Sobre nosotros</NavLink></li>
                                <li><NavLink to='/servicios' className='logo-lg'>Servicios</NavLink></li>
                                <li><NavLink to='/contacto' className='logo-lg'>Contacto</NavLink></li>
                                <li><NavLink to='/terminos' className='logo-lg'>Terminos y condiciones</NavLink></li>
                            </ul>
                          </menu>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div className="copyright-area">
            <div className="container">
                <div className="copyright-text col-12">
                    <p>Copyright &copy; 2023, All Right Reserved Alonso</p>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}
