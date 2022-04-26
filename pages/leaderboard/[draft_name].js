import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '../../context/GlobalState'
import _orderBy from 'lodash/orderBy'

// components
import Header from '../../components/header'
import Nav from '../../components/nav'
import Loading from '../../components/loading'

const sorted = (entries, i) => {
  console.log(entries);
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
                                  <td>{entry.name}</td>
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
    </div>
  )
}
