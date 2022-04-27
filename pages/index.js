import React from 'react'
import { isMobile } from 'react-device-detect'

// components
import Header from '../components/header'
import Nav from '../components/nav'
import Home from '../components/home'
import MetaMask from '../components/metamask'
import DraftLink from '../components/draftLink'

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

export default function App() {

  // on a mobile device open metamask native app
  if (isMobile && !isProd && window.ethereum) {
    return (
      <div className="min-h-screen grid-bg">
        <Header />
        <Nav />
        <MetaMask />
        <div className="px-10">
          <DraftLink />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <Nav />
      <Home />
    </div>
  )
}
