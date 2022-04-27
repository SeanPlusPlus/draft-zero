import React, { useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { GlobalContext } from '../../context/GlobalState'

// components
import Header from '../../components/header'
import Nav from '../../components/nav'
import Loading from '../../components/loading'

const Info = () => (
  <div className="alert alert-info shadow-lg mb-5">
    <div>
      <span className="text-sm">
        Optionally <Link href="/"><a className="link">connect your wallet</a></Link>, signin to Immutable X, and mint your draft
      </span>
    </div>
  </div> 
)

export default function Draft() {
  const [ error, setError ] = useState(false)
  const [ closed, setClosed ] = useState(null)
  const [ modal, setModal ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ warning, setWarning ] = useState(null)
  const [ draftUserName, setDraftName ] = useState(null)
  const [ submitting, setSubmitting ] = useState(null)
 
  const {
    // picks
    picks,
    setPicks,

    // options 
    options,
    setOptions,

    // account
    account,

    // imx 
    imx,
  } = useContext(GlobalContext)

  const router = useRouter()
  const { query: { draft_name }} = router

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/draft/${draft_name}`)
      const json = await res.json()
      setClosed(json.closed)
      setOptions(json.options)
      setPicks(Array(json.total_picks).fill(null))
      setDescription(json.description)
    }
    if (draft_name) {
      fetchData()
    }
  }, [draft_name])

  const updatePick = (picks, place, name) => {
    return picks.map((pick, idx) => {
      if (place === idx) {
        return name
      }
      return pick
    })
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    const arr = value.split(':')
    const place = parseInt(arr[0], 10)
    const name = arr[1]
    setPicks(updatePick(picks, place, name))
  }

  const handleName = (e) => {
    e.preventDefault()
    setDraftName(e.target.value)
  }

  const handleSubmit = async () => {
    if (!draftUserName) {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
      setWarning('Draft name required')
      return
    }
 
    const selected = picks.every((p) => (p !== null))
    if (!selected) {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
      setWarning('Each pick must be selected')
      return
    }

    setSubmitting(true)

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        draft_name,
        name: draftUserName,
        picks,
        account,
      })
    }
    const res = await fetch(`/api/entry/${draft_name}`, options)
    const json = await res.json()
    console.log('json', json);
    setModal('modal-open')
    if (json.error) {
      setError(true)
    }
  }

  if (closed) {
    return (
      <div className="min-h-screen grid-bg">
        <Header />
        <Nav />
        <div className="hero">
          <div className="hero-content text-center">
            <div className="card md:w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h1 className="text-4xl font-bold">Draft Closed</h1>
                <Link href={`/leaderboard/${draft_name}`}>
                  <a className="btn">
                    Visit the leaderbaord
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
 
  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <Nav />
      <div className="hero">
        {options.length > 0 && (
          <div className="hero-content text-center md:w-96">
            <div className="max-w-md">
              {!imx && (
                <Info />
              )}
              <h1 className="text-4xl font-bold">{description}</h1>
              <p className="py-6">
                Predict the order for the {description}
              </p>
              {warning && (
                <div className="alert alert-warning shadow-lg mb-3">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>{warning}</span>
                  </div>
                </div>
              )}
              <div className="card md:w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <ul>
                    {picks.map((p, i) => (
                      <li key={i}>
                        <select className="select select-bordered  w-full max-w-xs mb-3" onChange={handleChange}>
                          {!picks[i] && (
                            <option>#{i + 1}</option>
                          )}
                          {options.map((o, idx) => (
                            <option key={idx} value={`${i}:${o}`} disabled={picks.includes(o) || submitting}>
                              {picks[i] === o ? `#${i + 1} ${o}` : o}
                            </option>
                          ))}
                        </select>
                      </li>
                    ))}
                  </ul>
                  {(warning && !draftUserName) ? (
                    <input type="text" placeholder="Name" onChange={handleName} className="input input-bordered input-warning w-full max-w-xs" />
                  ) : (
                    <input type="text" placeholder="Name" onChange={handleName} className="input input-bordered w-full max-w-xs" disabled={submitting} />
                  ) }
                  {submitting ? (
                    <div className="mt-7">
                      <Loading />
                    </div>
                  ) : (
                    <button className="btn btn-secondary btn-outline mt-4" onClick={handleSubmit}>submit</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`modal ${modal}`}>
        <div className="modal-box">
          {!error ? (
            <>
              <h3 className="font-bold text-xl flex">
                <span className="ml-1 text-4xl mb-4">
                  Success!
                </span>
              </h3>
              <p className="pt-4">
                <code>{draftUserName}</code>
              </p>
              <p className="pt-4">
                Your draft prediction was received
              </p>
            </>
          ) : (
            <>
              <h3 className="font-bold text-xl flex">
                <span className="ml-1 text-4xl mb-4">
                  Error
                </span>
              </h3>
              <p className="pt-4">
                Draft is closed
              </p>
            </>
          )}
          <div className="modal-action pt-5">
            <Link href={`/leaderboard/${draft_name}`}>
              <a className="btn">
                Visit the leaderbaord
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
