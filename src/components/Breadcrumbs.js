// import React from 'react'
import { Link, useLocation } from "react-router-dom"
import '../styles/components/breadcrumbsStyle.css'

export default function Breadcrumbs() {
  const location = useLocation()

  let currentLink = ''

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '' && isNaN(crumb))
    .map(crumb => {
      currentLink += `/${crumb}`
      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{decodeURIComponent(crumb)}</Link>
        </div>
      )
    })

  return (
    <div id="breadcrumbs" className="breadcrumbs">{crumbs}</div>
    
  )
}
