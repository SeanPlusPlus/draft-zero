import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '../../context/GlobalState'
import _orderBy from 'lodash/orderBy'
import _find from 'lodash/find'

// components
import Header from '../../components/header'
import Nav from '../../components/nav'
import Loading from '../../components/loading'

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
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Leaderboard</h1>
            <h3 className="text-2xl font-bold">{description}</h3>
            {fetching ? (
              <div className="mt-3">
                <Loading />
              </div>
            ) : (
              <>
                <div className="card md:w-96 bg-base-100 shadow-xl mt-3">
                  <div className="card-body">
                    <div className="flex flex-wrap">
                      {leaderboard && leaderboard.draft && leaderboard.draft.total_picks && Array(leaderboard.draft.total_picks).fill().map((x, idx) => (
                        <div key={idx}>
                          <button className={`btn btn-xs mx-1 my-1 w-8 ${index === idx && 'btn-secondary'} cursor-default btn-active`} disabled={idx > (leaderboard.items.length - 1)} id={idx + 1}>
                            {idx + 1}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {items && items[index] && (
                  <div className="card md:w-96 bg-base-100 shadow-xl mt-3">
                    <div className="card-body">
                      <h2 className="card-title border-b-2">
                        #{index + 1} {items[index]}
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="table w-full">
                          <tbody>
                            {
                              sorted(leaderboard.entries, index).map((entry, index) => (
                                <tr key={entry.name}>
                                  <th>{index + 1}</th>
                                  <td>
                                    <div className="link link-info" id={entry.id} onClick={handleModal}>
                                      {entry.name}
                                    </div>
                                  </td>
                                  <td>{getScores(entry, index)}</td>
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
