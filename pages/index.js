import React from 'react';
import Head from 'next/head'

// components
import Nav from '../components/nav'
import Home from '../components/home'

export default function App() {
  return (
    <>
      <Head>
        <title>Draft Zero</title>
        <meta name="description" content="Draft Zero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Home />
    </>
  )
}
