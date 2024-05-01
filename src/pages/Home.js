import React from 'react'
import DinamicCards from '../components/DinamicCards'
import MainSlider from '../components/MainSlider'
import '../styles/pages/homeStyle.css'

export default function Home() {
  return (
    <div id='container-home' className='container-home'>
      <MainSlider /> 
      <DinamicCards />
      {/* Europe map Highcharts */}

    </div>
  )
}

// Catering

// Se lleva se sirve,
// depende del numero de personas
// y del lugar de la celebración.
// elegen a la carta

//Cotillon