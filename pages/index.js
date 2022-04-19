import React from 'react';
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Head from 'next/head'

export default function Home() {
  const { user: { authenticated } } = useContext(GlobalContext)
  const handleLogin = () => {
    console.log('login ...');
  }
  return (
    <>
      <Head>
        <title>Draft Zero</title>
        <meta name="description" content="Draft Zero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl">Draft Zero</h1>
        {authenticated === null && (
          <button className="btn btn-outline btn-secondary" onClick={handleLogin}>login</button>
        )}
      </main>
    </>
  )
}
