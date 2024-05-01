import React,{ useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import '../styles/components/mainSlider.css'
import { getOfertasTop } from '../controller/ofertas.controller'
import API_CONFIG from '../controller/api.config'
import { useNavigate } from 'react-router-dom'

export default function MainSlider() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const response = await getOfertasTop()
    if (response.status === 200) {
      setBanners(response.data.data)
      setLoading(false)
    }
  }

  return (
      <section className='main-slider'>
        {loading ? <div className='loader' aria-label="Los productos están cargando"></div>  : 
        <Carousel 
        autoPlay 
        interval={10000} 
        infiniteLoop 
        showStatus={false} 
        showThumbs={false}
        showIndicators={true} 
        showArrows={true}
        swipeable
        emulateTouch>
        {banners.map(function(banner) {
          const img = JSON.parse(banner.Banner)
          const url = `/productos/${banner.Nombre[1]}/${banner.Id}`
          return (<div onClick={() => navigate(url)} key={`banner-${banner.Id}`}>
              <img src={API_CONFIG.BASE_URL+img.Img} alt={banner.Nombre[0]} />
          </div>)
        })}
      </Carousel>}
      </section>
  );
}


// import React, { useEffect, useState, useRef } from 'react'
// import '../styles/components/mainSlider.css'
// import { useOfertasBanners } from '../controller/ofertas.controller'
// import API_CONFIG from '../controller/api.config'

// export default function MainSlider() {
//   const { banners, loading, error } = useOfertasBanners()
//   const listRef = useRef()
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     const listNode = listRef.current
//     if (listNode) {
//       const imgNode = listNode.querySelectorAll("li > img")[currentIndex]
//       if (imgNode) {
//         imgNode.scrollIntoView({
//           behavior: "smooth"
//         })
//       }
//     }
//   }, [currentIndex])

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     setCurrentIndex((currentIndex + 1) % banners.length)
//   //   }, 5000)

//   //   return () => clearInterval(interval)
//   // }, [currentIndex, banners])


//   const scrollToImage = (direction) => {
//     if (direction === 'prev') {
//       setCurrentIndex(curr => {
//         const isFirstSlide = currentIndex === 0
//         return isFirstSlide ? 0 : curr - 1
//       })
//     } else {
//       const isLastSlide = currentIndex === banners.length - 1
//       if (!isLastSlide) {
//         setCurrentIndex(curr => curr + 1)
//       }
//     }
//   }

//   const goToSlide = (slideIndex) => {
//     setCurrentIndex(slideIndex)
//   }

//   if (loading || error || !banners || banners.length === 0) {
//     return null
//   }

//   return (<div className="main-slider-container">
//     <div className="slider-container">
//       <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
//       <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
//       <div className="container-images">
//         <ul ref={listRef}>
//           {banners.map(function(banner, index) {
//             const img = JSON.parse(banner.Banner)
//             return ( 
//               <li key={`banner-${banner.Id}`} >
//                 <img src={API_CONFIG.BASE_URL+img["1"]} alt={banner.Nombre} width={1600} height={550}/>
//               </li>)
//           })}
//         </ul>
//       </div>
//       <div className="dots-container">
//         {banners.map((_, idx) => (
//         <button key={`dot-${idx}`}
//           className={`dot-container-item ${idx === currentIndex ? 'active' : ''}`}
//           onClick={() => goToSlide(idx)}>
//           {idx+1}
//         </button>))}
//       </div>
//     </div>
//   </div>)
// }
