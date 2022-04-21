import React, { useContext, useEffect } from 'react'
import {useRouter} from 'next/router'
import { GlobalContext } from '../../context/GlobalState'

// components
import Header from '../../components/header'
import Nav from '../../components/nav'

// draft options
import { draft } from '../../utils/nfl/draft'

export default function NFL() {
  const {
    // picks
    picks,
    setPicks,

    // options 
    options,
    setOptions,
  } = useContext(GlobalContext)

  const router = useRouter()
  const { query: { year }} = router

  useEffect(() => {
    const key = `_${year}`
    const data = draft[key]
    if (data) {
      setOptions(data)
    }
  }, [year])

  useEffect(() => {
    setPicks(Array(32).fill(null))
  }, [])

  const updatePick = (picks, place, name) => {
    return picks.map((pick, idx) => {
      if (place === idx) {
        return name
      }
      return pick
    })
  }

  const handleChange = (e) => {
    const { value } = e.target
    const arr = value.split(':')
    const place = parseInt(arr[0], 10)
    const name = arr[1]
    setPicks(updatePick(picks, place, name))
  }
 
  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <Nav />
      <div className="hero">
        {options.length > 0 && (
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">NFL {year}</h1>
              <p className="py-6">
                Predict the order for the {year} NFL Draft
              </p>
              <div className="card md:w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <ul>
                    {picks.map((p, i) => (
                      <li key={i}>
                        <select className="select select-bordered  w-full max-w-xs mb-3" onChange={handleChange}>
                          <option>#{i + 1}</option>
                          {options.map((o, idx) => (
                            <option key={idx} value={`${i}:${o}`}>{o}</option>
                          ))}
                        </select>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
