import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

// components
import Header from '../components/header'
import Nav from '../components/nav'

export default function NFL() {
  const {
    // picks
    picks,
    setPicks,
  } = useContext(GlobalContext)

  useEffect(() => {
    setPicks(Array(32).fill(null))
  }, [])

  const options = [
    "Aidan Hutchinson",
    "Ikem Ekwonu",
    "Evan Neal",
    "Kyle Hamilton",
    "Ahmad Gardner",
    "Garrett Wilson",
    "Kayvon Thibodeaux",
    "Travon Walker",
    "Drake London",
    "Jermaine Johnson II",
    "Derek Stingley Jr.",
    "Nakobe Dean",
    "Devin Lloyd",
    "Trent McDuffie",
    "Charles Cross",
    "Jordan Davis",
    "Chris Olave",
    "Tyler Linderbaum",
    "Jameson Williams",
    "Devonte Wyatt",
    "Malik Willis",
    "Kenny Pickett",
    "Daxton Hill",
    "George Karlaftis",
    "Trevor Penning",
  ]

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
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">NFL 2022</h1>
            <p className="py-6">
              Predict the order for the 2022 NFL Draft
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
      </div>
    </div>
  )
}
