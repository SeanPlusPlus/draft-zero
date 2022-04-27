import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GlobalContext } from '../../context/GlobalState'
import _orderBy from 'lodash/orderBy'
import _find from 'lodash/find'

// components
import Header from '../../components/header'
import Nav from '../../components/nav'
import Loading from '../../components/loading'

const truncate = (input) => {
  const n = 15
  if (input.length > n) {
     return input.substring(0, n) + '...'
  }
  return input
}

const sorted = (entries, i) => {
  return _orderBy(entries.map((entry) => {
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

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/leaderboard/${draft_name}`)
      const json = await res.json()
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
    }
    if (draft_name) {
      fetchData()
    }
  }, [draft_name])

  const handleModal = (e) => {
    const { target: { id }} = e
    const entry = _find(leaderboard.entries, (item) => { return item.id === id })
    
    setModal('modal-open')
    setEntry(entry)
  }

  const handleClose = () => {
    setModal('')
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

                {items && items[index] && (
                  <div className="card bg-base-100 shadow-xl mt-3">
                    <div className="card-body">
                      <h2 className="card-title border-b-2">
                        #{index + 1} {items[index]}
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="mt-4 table w-full table-zebra">
                          <thead>
                            <tr>
                              <th>Rank</th>
                              <th>Name</th>
                              <th className="hidden md:block">Current</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              sorted(leaderboard.entries, index).map((entry, i) => (
                                <tr key={i}>
                                  <th>{i + 1}</th>
                                  <td>
                                    <div className="flex">
                                      <div className="link link-info" id={entry.id} onClick={handleModal}>
                                        {truncate(entry.name)}
                                      </div>
                                      {entry.official && (
                                        <span className="ml-2 tooltip" data-tip="Official ESPN Expert">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                          </svg>
                                        </span>
                                      )}
                                      {entry.account && (
                                        <span className="ml-2 tooltip" data-tip="Minted NFT">
                                          <Link href={`${leaderboard.draft.market_url}/${leaderboard.draft.contract}/${entry.id}`}>
                                            <a target="_blank" rel="noreferrer" className="link">
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                              </svg>
                                            </a>
                                          </Link>
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
        <div className="modal-box">
          <h3 className="font-bold text-xl flex">
            <span className="text-3xl mb-4">
              {entry.name}
            </span>
          </h3>
          Current score: <code className="font-bold bg-black p-1 text-slate-200 rounded-md">{entry.score}</code>
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
          </div>
          <div className="modal-action pt-5">
            <label htmlFor="my-modal" className="btn" onClick={handleClose}>Close</label>
          </div>
        </div>
      </div>
      


    </div>
  )
}
