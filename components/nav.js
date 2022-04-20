import Link from 'next/link'
import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '../context/GlobalState'
import { getShortAddress } from '../utils/name'

const Nav = () => {
  const [ modal, setModal ] = useState('')

  const {
    name,
    imx,
  } = useContext(GlobalContext)

  const router = useRouter()
  const { pathname } = router

  const handleOpen = () => {
    setModal('modal-open')
  }

  const handleClose = () => {
    setModal('')
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
          { name && (
            <>
              <Link href="/">
                <a className={`mr-2 link ${pathname !== '/' && 'link-hover'}`}>Home</a>
              </Link>
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-outline text-stone-50">
                  {name}
                </label>
                <ul tabIndex="0" className="p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52">
                  <li>
                    <button onClick={handleOpen} className="justify-between">
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


      <div className={`modal ${modal}`}>
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
            <code className="font-semibold">{name}</code>
          </p>
          {imx && (
            <>
              <div className="divider" />
              <p className="pt-1">
                Stark Key:
            <br />
                <code className="font-semibold">{getShortAddress(imx.starkPublicKey)}</code>
              </p>
            </>
          )}
          <div className="modal-action pt-5">
            <label htmlFor="my-modal" className="btn" onClick={handleClose}>Close</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav 
