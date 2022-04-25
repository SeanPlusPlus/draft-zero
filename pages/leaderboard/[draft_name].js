import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '../../context/GlobalState'

// components
import Header from '../../components/header'
import Nav from '../../components/nav'
import Loading from '../../components/loading'

export default function Leaderboard() {
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
      const reversed = items.reverse()
      setFetching(false)
      setLeaderboard({
        items: reversed,
        ...json
      })
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
            {fetching && (
              <div className="mt-3">
                <Loading />
              </div>
            )}
              {leaderboard.items.map((i, idx) => (
                <div key={idx} className="card md:w-96 bg-base-100 shadow-xl mt-3">
                  <div className="card-body">
                    <h2 className="card-title border-b-2">
                      #{leaderboard.items.length - idx} {i}
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <tbody>

                          {leaderboard.entries.map((e, index) => (
                            <tr key={index}>
                              <th>{index + 1}</th>
                              <td>{e.name}</td>
                              <td>5</td>
                              <td>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                </svg>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
