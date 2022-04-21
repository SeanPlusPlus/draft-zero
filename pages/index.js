import React from 'react'
import { isMobile } from 'react-device-detect'
import Link from 'next/link'

// components
import Header from '../components/header'
import Nav from '../components/nav'
import Home from '../components/home'

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const METAMASK_URL = 'https://metamask.app.link/dapp/draft-zero.vercel.app/'

export default function App() {
  if (isMobile && isProd) {
    return (
      <div className="min-h-screen">
        <div className="text-center">
          <Link href={METAMASK_URL}>
            <button className="btn btn-outline px-10 mt-20">Open in MetaMask</button>
          </Link>
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
