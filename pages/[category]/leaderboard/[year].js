import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '../../../context/GlobalState'

// components
import Header from '../../../components/header'
import Nav from '../../../components/nav'

export default function Leaderboard() {
  const router = useRouter()
  const { query: { year, category }} = router

  const {
    // leaderboard
    leaderboard,
    setLeaderboard,
  } = useContext(GlobalContext)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/${category}/leaderboard/${year}`)
      const json = await res.json()
      const { draft: {
        items,
      }} = json
      const reversed = items.reverse()
      setLeaderboard({
        items: reversed,
        ...json
      })
    }
    if (category && year) {
      fetchData()
    }
  }, [category, year])
 
  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <Nav />
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">{category && category.toUpperCase()} {year} Leaderboard</h1>
              {leaderboard.items.map((i, idx) => (
                <div key={idx} className="card md:w-96 bg-base-100 shadow-xl mt-3">
                  <div className="card-body">
                    <h2 className="card-title">
                      #{leaderboard.items.length - idx} {i}
                    </h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
