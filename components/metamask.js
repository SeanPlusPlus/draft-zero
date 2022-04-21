import Link from 'next/link'

const METAMASK_URL = 'https://metamask.app.link/dapp/draft-zero.vercel.app/'


const MetaMask = () => {
  return (
    <div className="hero">
      <code>ETHEREUM {window.ethereum ? 'yes' : 'no'}</code>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <Link href={METAMASK_URL}>
            <button className="btn px-10 mt-20">
              <span className="mr-2">
                Open in MetaMask
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MetaMask
