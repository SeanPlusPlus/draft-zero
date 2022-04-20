import React from 'react';

// components
import Header from '../components/header'
import Nav from '../components/nav'

export default function NFL() {

  const picks = Array(32).fill({});
  const options = [
    ["Aidan Hutchinson", "Michigan", "DE"],
    ["Ikem Ekwonu", "NC State", "OT"],
    ["Evan Neal", "Alabama", "OT"],
    ["Kyle Hamilton", "Notre Dame", "S"],
    ["Ahmad Gardner", "Cincinnati", "CB"],
    ["Garrett Wilson", "Ohio State", "WR"],
    ["Kayvon Thibodeaux", "Oregon", "DE"],
    ["Travon Walker", "Georgia", "DE"],
    ["Drake London", "USC", "WR"],
    ["Jermaine Johnson II", "Florida State", "DE"],
    ["Derek Stingley Jr.", "LSU", "CB"],
    ["Nakobe Dean", "Georgia", "ILB"],
    ["Devin Lloyd", "Utah", "ILB"],
    ["Trent McDuffie", "Washington", "CB"],
    ["Charles Cross", "Mississippi State", "OT"],
    ["Jordan Davis", "Georgia", "DT"],
    ["Chris Olave", "Ohio State", "WR"],
    ["Tyler Linderbaum", "Iowa", "C"],
    ["Jameson Williams", "Alabama", "WR"],
    ["Devonte Wyatt", "Georgia", "DT"],
    ["Malik Willis", "Liberty", "QB"],
    ["Kenny Pickett", "Pittsburgh", "QB"],
    ["Daxton Hill", "Michigan", "S"],
    ["George Karlaftis", "Purdue", "DE"],
    ["Trevor Penning", "Northern Iowa", "OT"]
  ]

  const handleChange = (e) => {
    const { value } = e.target
    const arr = value.split(':')
    const place = arr[0]
    const name = arr[1]
    console.log(place, name);
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
                          <option key={idx} value={`${i + 1}:${o[0]}`}>{o[0]}</option>
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
