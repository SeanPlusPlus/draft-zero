import React, { useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import { GlobalContext } from '../../context/GlobalState'

// components
import Header from '../../components/header'
import Nav from '../../components/nav'

// draft options
import { draft } from '../../utils/nfl/draft'

export default function NFL() {
  const [warning, setWarning] = useState(null)
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
    setPicks(Array(3).fill(null))
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
    e.preventDefault()
    const { value } = e.target
    const arr = value.split(':')
    const place = parseInt(arr[0], 10)
    const name = arr[1]
    setPicks(updatePick(picks, place, name))
  }

  const handleSubmit = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    console.log(picks);
    const selected = picks.every((p) => (p !== null))
    if (!selected) {
      setWarning('Each pick must be selected')
      return
    }
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
                            <option key={idx} value={`${i}:${o}`}>{o}</option>
                          ))}
                        </select>
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-info" onClick={handleSubmit}>submit</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
