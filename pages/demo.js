import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import axios from 'axios';
import Head from 'next/head'
import _orderBy from 'lodash/orderBy'

import Loading from '../components/loading'
import Nav from '../components/nav';
import Header from '../components/header';

const API_BASE = '/api/'

const sorted = (entries, i) => {
  return _orderBy(entries.map((entry) => {
    const current = entry.scores[i].score
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

export default function Demo() {
  const [data, setData] = useState({ items: [], draft: [], entries: [], PENALTY: 0 });

  useEffect(async () => {
    const url = API_BASE + 'demo'
    const result = await axios(url);

    setData(result.data);
  }, []);

  const About = () => (
    <div className="mx-4">
      <p className="pb-4">Each entry is a random draft prediction for an Avenger in a hypothetical draft. The entry receives the square of the absolute value of the number of positions they are off from where the Avenger was actually drafted.</p>
      <p className="pb-4">Thus, if Hulk goes number one overall, and your entry predicts him going fourth, your score for that pick is nine:</p>
      <p className="pb-4"><code className="code">(4 - 1) ^ 2 = 9</code></p>
      <p className="pb-4">If the Avenger is drafted in the spot where the entry predicted they would be drafted, then the score for that pick is zero.</p>
      <p className="pb-4">If an Avenger is drafted and they are not listed in the entry at all, then they are scored as if they were predicted to be drafted number <code className="code">{data.PENALTY}</code> overall.</p>
      <p className="pb-4">Thus, if Thor goes number one overall, and you did not predict that he would be drafted, your score for that pick is:</p>
      <p className="pb-4"><code className="code">{`(${data.PENALTY} - 1) ^ 2 = ${Math.pow(Math.abs(data.PENALTY - 1), 2)}`}</code></p>
      <p className="pb-4">Lowest score wins.</p>
      <p className="pb-4">
        <Link href="/"><a className="link link-secondary">Click here to return home</a></Link>  
      </p>
      <p className="pb-4">
        Or refresh this page and see a new random score get generated.
      </p>
    </div>
  )

  return (
    <>
      <Header />
      <Nav />
      { data.entries.length ? (
        <main className="wrapper mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="ml-5">
              <h3 className="text-3xl">Items</h3>
              <ul>
                {data.items.map((item) => (
                  <li className="list-disc ml-6" key={item.name}>{item.name}</li>
                ))}
              </ul>
              <h3 className="text-3xl mt-5">Draft</h3>
              <ol>
                {data.draft.map((item, idx) => (
                  <li className="list-decimal ml-6" key={item.name}>
                    {item.name}
                    <ul>
                      {
                        sorted(data.entries, idx).map((entry) => (
                          <li className="list-disc ml-6" key={entry.name}>
                            {entry.name}: {getScores(entry, idx)}
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mr-2">
              <h3 className="text-3xl">Entries</h3>
              <ul>
                {data.entries.map((entry) => (
                  <li key={entry.name} className="list-disc ml-6">
                    {entry.name}: {entry.score}
                    <ol>
                      {entry.items.map((i) => (
                        <li key={i.name} className="list-decimal ml-6">{i.name}</li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
              <div className="hidden md:block">
                <h3 className="text-3xl mt-5">About</h3>
                <About />
              </div>
            </div>
          </div>
          <div className="md:hidden ml-5">
            <h3 className="text-3xl mt-5">About</h3>
            <About />
          </div>
        </main>
      ) : (
        <div className="mt-24">
          <Loading />
        </div>
      )}
    </>
  )
}
