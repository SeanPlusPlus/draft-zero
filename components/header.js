import Head from 'next/head'

const Header = () => {
  return (
    <Head>
      <title>Draft Zero</title>
      <meta name="description" content="Draft Zero" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://draft-zero.vercel.app/" />
      <meta property="og:title" content="Draft Zero" />
      <meta property="og:description" content="Build a prediction for any draft" />
      <meta property="og:image" content="https://i.imgur.com/Jg3rU2i.png" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" value="draft-zero.vercel.app" />
      <meta name="twitter:title" value="Draft Zero" />
      <meta name="twitter:description" value="Build a prediction for any draft" />
      <meta name="twitter:image" content="https://i.imgur.com/Jg3rU2i.png" />
      <meta name="twitter:url" value="https://draft-zero.vercel.app/" />
    </Head>
  )
}

export default Header
