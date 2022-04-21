import React from 'react'
import {isMobile} from 'react-device-detect'
import Link from 'next/link'

// components
import Header from '../components/header'
import Nav from '../components/nav'
import Home from '../components/home'


export default function App() {
  if (isMobile) {
    const METAMASK_URL = 'https://metamask.app.link/dapp/draft-zero.vercel.app/'
    window.location.href = METAMASK_URL
  }
 
  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <Nav />
      <Home />
    </div>
  )
}
