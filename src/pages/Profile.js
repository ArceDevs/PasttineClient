import React, { useState, useEffect } from 'react'
import '../styles/components/buttonHover.css'
import Cookies from 'universal-cookie'

import ProfileData from '../components/ProfileData'
import ProfilePassword from '../components/ProfilePassword'

export default function Profile({ setUser }) {
  const cookie = new Cookies()
  const userCookie = cookie.get('user')

  useEffect(() => {
    cookie.set('user', userCookie, { path: '/' })
  }, [userCookie])

  return (
    <div className='form-page'>
      <ProfileData user={userCookie} setUser={setUser} cookie={cookie}/>
      <ProfilePassword user={userCookie} email={userCookie.Email}/>
    </div>
  )
}
