import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import _orderBy from 'lodash/orderBy'
import _find from 'lodash/find'
import { GlobalContext } from '../../context/GlobalState'
import { useInterval } from '../../utils/useInterval'

// components
import Header from '../../components/header'
import Nav from '../../components/nav'
import Loading from '../../components/loading'

const truncate = (input, n) => {
  if (input.length > n) {
     return input.substring(0, n) + '...'
  }
  return input
}

const sorted = (entries, zap) => {
  const zapped = zap ? entries.filter((entry) => (entry.pool)) : entries
  return _orderBy(zapped.map((entry) => {
    const current = entry.score
    return {
      ...entry,
      current
    }
  }), ['current'], ['asc'])
}

const getScores = (entry, idx) => {
  const { scores } = entry 
  const { score } = scores[idx]
  return score
}

export default function Leaderboard() {
  const [ zap, setZap ] = useState(false)
  const [ index, setIndex ] = useState(null)
  const [ items, setItems] = useState([])
  const [ modal, setModal ] = useState('')
  const [ entry, setEntry] = useState({ picks: [], scores: [] })
  const [ fetching, setFetching ] = useState(true)
  const [ description, setDescription ] = useState('')
  const router = useRouter()
  const { query: { draft_name }} = router

  const {
    // leaderboard
    leaderboard,
    setLeaderboard,
  } = useContext(GlobalContext)

  async function fetchData() {
    const res = await fetch(`/api/leaderboard/${draft_name}`)
    const json = await res.json()
    return json
  }

  useEffect(() => {
    if (draft_name) {
      fetchData().then((json) => {
        const { draft: {
          description,
          items,
        }} = json
        setFetching(false)
        setIndex(items.length - 1)
        setLeaderboard({
          items,
          ...json
        })
        setItems(items)
        setDescription(description)
      })
    }
  }, [draft_name])

  useInterval(() => {
    fetchData().then((json) => {
      const { draft: {
        description,
        items,
      }} = json
      const d = new Date();
      if (items.length !== leaderboard.items.length) {
        console.log('* UPDATING *', d.toLocaleTimeString())
        setIndex(items.length - 1)
        setLeaderboard({
          items,
          ...json
        })
        setItems(items)
        setDescription(description)
      } else {
        // console.log('polling', d.toLocaleTimeString())
      }
    })
  }, 1000 * 3);

  const handleModal = (e) => {
    const id = e.target.closest('tr').id
    const entry = _find(leaderboard.entries, (item) => { return item.id === id })
    
    setModal('modal-open')
    setEntry(entry)
  }

  const handleClose = () => {
    setModal('')
  }

  const handleZap = () => {
    const z = !zap
    setZap(z)
  }
 
  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <Nav />
      <div className="hero md:px-20 lg:px-60">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-4xl font-bold">Leaderboard</h1>
            <h3 className="text-2xl font-bold">{description}</h3>
            {fetching ? (
              <div className="mt-3">
                <Loading />
              </div>
            ) : (
              <>
                <div className="card bg-base-100 shadow-xl mt-3">
                  <div className="card-body">
                    <div className="flex flex-wrap">
                      {leaderboard && leaderboard.draft && leaderboard.draft.total_picks && Array(leaderboard.draft.total_picks).fill().map((x, idx) => (
                        <div key={idx}>
                          <button className={`btn btn-xs mx-1 my-1 w-7 ${index === idx && 'btn-secondary'} cursor-default btn-active`} disabled={idx > (leaderboard.items.length - 1)} id={idx + 1}>
                            {idx + 1}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {items.length === 0 && (
                  <div className="card bg-base-100 shadow-xl mt-3">
                    <div className="card-body">
                      <h2 className="card-title border-b-2 flex">
                        <div>
                          Entries
                        </div>
                        <div className="ml-auto order-2 mb-1">
                          {zap ? (
                            <button className="btn btn-xs" onClick={handleZap}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </button>
                          ) : (
                            <button className="btn btn-xs btn-outline" onClick={handleZap}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="mt-4 table w-full table-zebra">
                          <tbody>
                          {
                            leaderboard.entries
                            .filter((entry) => {
                              if (entry.pool || !zap) {
                                return true
                              }
                              return false
                            })
                            .map((entry, i) => {
                              return (
                                <tr key={i} id={entry.id} onClick={handleModal} className="hover cursor-pointer">
                                  <td>
                                    <div className="flex">
                                      <div>
                                        <span className="block md:hidden">
                                          {truncate(entry.name, 7)}
                                        </span>
                                        <span className="hidden md:block lg:hidden">
                                          {truncate(entry.name, 15)}
                                        </span>
                                        <span className="hidden lg:block">
                                          {truncate(entry.name, 25)}
                                        </span>
                                      </div>
                                      {entry.official && (
                                        <span className="ml-2 tooltip" data-tip={entry.official}>
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                          </svg>
                                        </span>
                                      )}
                                      {entry.account && (
                                        <span className="ml-2 tooltip" data-tip="Minted NFT">
                                          <Link href={`${leaderboard.draft.market_url}/${leaderboard.draft.contract}/${entry.id}`}>
                                            <a target="_blank" rel="noreferrer" className="link">
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                              </svg>
                                            </a>
                                          </Link>
                                        </span>
                                      )}
                                      {entry.pool && (
                                        <span className="ml-2">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                          </svg>
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )})
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {items && items[index] && (
                  <div className="card bg-base-100 shadow-xl mt-3">
                    <div className="card-body">
                      <h2 className="card-title border-b-2">
                        <div>
                          #{index + 1} {items[index]}
                        </div>
                        <div className="ml-auto order-2 mb-1">
                          {zap ? (
                            <button className="btn btn-xs" onClick={handleZap}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </button>
                          ) : (
                            <button className="btn btn-xs btn-outline" onClick={handleZap}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="mt-4 table w-full table-zebra">
                          <thead>
                            <tr>
                              <th>
                                <span className="block md:hidden">
                                  #
                                </span>
                                <span className="hidden md:block">
                                  Rank
                                </span>
                              </th>
                              <th>Name</th>
                              <th className="hidden md:block">Current</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              sorted(leaderboard.entries, zap).map((entry, i) => (
                                <tr key={i} id={entry.id} onClick={handleModal} className="hover cursor-pointer">
                                  <th>{i + 1}</th>
                                  <td>
                                    <div className="flex">
                                      <div>
                                        <span className="block md:hidden">
                                          {truncate(entry.name, 7)}
                                        </span>
                                        <span className="hidden md:block lg:hidden">
                                          {truncate(entry.name, 15)}
                                        </span>
                                        <span className="hidden lg:block">
                                          {truncate(entry.name, 25)}
                                        </span>
                                      </div>
                                      {entry.official && (
                                        <span className="ml-2 tooltip" data-tip={entry.official}>
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                          </svg>
                                        </span>
                                      )}
                                      {entry.account && (
                                        <span className="ml-2 tooltip" data-tip="Minted NFT">
                                          <Link href={`${leaderboard.draft.market_url}/${leaderboard.draft.contract}/${entry.id}`}>
                                            <a target="_blank" rel="noreferrer" className="link">
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                              </svg>
                                            </a>
                                          </Link>
                                        </span>
                                      )}
                                      {entry.pool && (
                                        <span className="ml-2">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                          </svg>
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="hidden md:block">{getScores(entry, index)}</td>
                                  <td><code className="font-bold bg-black p-1 text-slate-200 rounded-md">{entry.score}</code></td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={`modal ${modal}`}>
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleClose}>✕</label>
          <h3 className="font-bold text-xl flex">
            <span className="text-3xl mb-4">
              {entry.name}
            </span>

            {entry.official && (
              <span className="ml-2 tooltip" data-tip={entry.official}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </span>
            )}
            {entry.account && (
              <span className="ml-2 tooltip" data-tip="Minted NFT">
                <Link href={`${leaderboard.draft.market_url}/${leaderboard.draft.contract}/${entry.id}`}>
                  <a target="_blank" rel="noreferrer" className="link">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </a>
                </Link>
              </span>
            )}
            {entry.pool && (
              <span className="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
            )}

          </h3>
          {items.length > 0 && (
            <>
              <span className="mr-1">
                Current score: 
              </span>
              <code className="font-bold bg-black p-1 text-slate-200 rounded-md">{entry.score}</code>
            </>
          )}
          <div className="divider" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-xl">Draft Prediction</h4>
              <ul>
                {entry.picks.map((p) => (
                  <li className="list-decimal ml-6" key={p}>{p}</li>
                ))}
              </ul>
            </div>

            {items.length > 0 && (
              <div>
                <h4 className="text-xl">Scores</h4>
                <ul>
                  {entry.scores.map((s, i) => (
                    <li className="list-decimal ml-6" key={i}>
                      {s.item.name}: <code className="font-bold">{s.score}</code>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="modal-action pt-5">
            <label htmlFor="my-modal" className="btn" onClick={handleClose}>Close</label>
          </div>
        </div>
      </div>
      


    </div>
  )
}
