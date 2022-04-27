import Link from 'next/link'
import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '../context/GlobalState'

// TODO: refactor to featured draft
const PENALTY = 50

const Nav = () => {
  const [ modalProfile, setModalProfile ] = useState('')
  const [ modalAbout, setModalAbout ] = useState('')

  const {
    name,
    imx,
    account,
  } = useContext(GlobalContext)

  const router = useRouter()
  const { pathname } = router

  const handleOpenProfile = () => {
    setModalProfile('modal-open')
  }

  const handleCloseProfile = () => {
    setModalProfile('')
  }

  const handleOpenAbout = () => {
    setModalAbout('modal-open')
  }

  const handleCloseAbout = () => {
    setModalAbout('')
  }

  return (
    <>
      <div className="navbar shadow-lg bg-neutral text-neutral-content">
        <div className="flex-1">
          <Link href="/">
            <a className="btn btn-outline normal-case text-xl ml-2">
              <span className="text-slate-300">Draft</span><span role="img" aria-label="zero" className="ml-2">0️⃣</span>
            </a>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <a className="mr-2 link link-hover" onClick={handleOpenAbout}>About</a>
          { name && (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-outline text-stone-50">
                  {name}
                </label>
                <ul tabIndex="0" className="p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52">
                  <li>
                    <button onClick={handleOpenProfile} className="justify-between">
                      Profile
                    </button>
                  </li>
                  <li>
                    <a href="/">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={`modal ${modalProfile}`}>
        <div className="modal-box">
          <h3 className="font-bold text-xl flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-1 text-xl mb-4">
              Account
            </span>
          </h3>
          <p className="pt-4">
            Public Key:
            <br />
            <code className="font-semibold text-xs">{account}</code>
          </p>
          {imx && (
            <>
              <div className="divider" />
              <p className="pt-1">
                Stark Key:
                <br />
                <code className="font-semibold text-xs">{imx.starkPublicKey}</code>
              </p>
            </>
          )}
          <div className="modal-action pt-5">
            <label htmlFor="my-modal" className="btn" onClick={handleCloseProfile}>Close</label>
          </div>
        </div>
      </div>

      <div className={`modal ${modalProfile}`}>
        <div className="modal-box">
          <h3 className="font-bold text-xl flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-1 text-xl mb-4">
              Account
            </span>
          </h3>
          <p className="pt-4">
            Public Key:
            <br />
            <code className="font-semibold text-xs">{account}</code>
          </p>
          {imx && (
            <>
              <div className="divider" />
              <p className="pt-1">
                Stark Key:
                <br />
                <code className="font-semibold text-xs">{imx.starkPublicKey}</code>
              </p>
            </>
          )}
          <div className="modal-action pt-5">
            <label htmlFor="my-modal" className="btn" onClick={handleCloseProfile}>Close</label>
          </div>
        </div>
      </div>

      <div className={`modal ${modalAbout}`}>
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleCloseAbout}>✕</label>
          <h3 className="font-bold text-xl flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-1 text-xl mb-4">
              About
            </span>
          </h3>

              <div>

                <p className="pb-4">
                  Do your best to predict the outcome of the 2022 NFL Draft. The scoring for your submission works as follows:
                </p>
                <p className="pb-4">
                  Each pick receives the square of the absolute value of the number of positions that it is off from where the athlete was actually drafted. Trades will not affect the outcome, the only thing that matters is the spot the athlete was drafted in.
                </p>
                <p className="pb-4">
                  Thus, if Drake London goes number one overall, and your entry predicts him going fourth, your score for that pick is nine:
                </p>
                <p className="pb-4">
                  <code className="code">(4 - 1) ^ 2 = 9</code>
                </p>
                <p className="pb-4">
                  If an athlete is drafted in the spot where your entry predicted they would be drafted, then the score for that pick is zero.</p>
                <p className="pb-4">
                  If an athlete is drafted and they are not listed in your entry at all, then they are scored as if they were predicted to be drafted number <code className="code">{PENALTY}</code> overall.
                </p>
                <p className="pb-4">
                  Thus, if Kenny Picket goes number ten overall, and you did not predict that he would be drafted, your score for that pick is:
                </p>
                <p className="pb-4">
                  <code className="code">{`(${PENALTY} - 10) ^ 2 = ${Math.pow(Math.abs(PENALTY - 10), 2)}`}</code>
                </p>
                <p className="pb-4">
                  Lowest score wins.
                </p>
                <p className="pb-4">
                  You can checkout the <Link href="/demo"><a className="link link-secondary">demo page</a></Link> for an interactive view of a theoretical Avengers draft.
                </p>
              </div>

          <div className="modal-action pt-5">
            <label htmlFor="my-modal" className="btn" onClick={handleCloseAbout}>Close</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav 
