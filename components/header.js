import Head from 'next/head'

const logo = 'https://cdn.midjourney.com/d55ce8a3-950b-46c1-9cb9-351ca8ad8007/0_1.png'

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
      <meta property="og:image" content={logo} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" value="draft-zero.vercel.app" />
      <meta name="twitter:title" value="Draft Zero" />
      <meta name="twitter:description" value="Build a prediction for any draft" />
      <meta name="twitter:image" content={logo} />
      <meta name="twitter:url" value="https://draft-zero.vercel.app/" />
    </Head>
  )
}

export default Header
