import React from 'react';
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Draft Zero</title>
        <meta name="description" content="Draft Zero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="wrapper">
        <div className="row">
          <h1>Draft Zero</h1>
        </div>
      </main>
    </>
  )
}
