import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head'
import _orderBy from 'lodash/orderBy'

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
  const { score, floor, ceiling } = scores[idx]
  return (
    <ul>
      <li>
        score: {score}
      </li>
      {floor && (
        <li>
          floor: {floor}
        </li>
      )}
      {ceiling && (
        <li>
          ceiling: {ceiling}
        </li>
      )}
    </ul>
  )
}

export default function Demo() {
  const [data, setData] = useState({ items: [], draft: [], entries: [], PENALTY: 0 });

  useEffect(async () => {
    const url = API_BASE + 'demo'
    const result = await axios(url);

    setData(result.data);
  }, []);

  return (
    <>
      <Head>
        <title>Draft Zero</title>
        <meta name="description" content="Draft Zero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="wrapper">
        <div className="row">
          <div className="column">
            <h3>Items</h3>
            <ul>
              {data.items.map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
            <h3>Draft</h3>
            <ol>
              {data.draft.map((item, idx) => (
                <li key={item.name}>
                  {item.name}
                  <ul>
                    {
                      sorted(data.entries, idx).map((entry) => (
                        <li key={entry.name}>
                          {entry.name}
                          {getScores(entry, idx)}
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <div className="column">
            <h3>Entries</h3>
            <ul>
              {data.entries.map((entry) => (
                <li key={entry.name} className="entry">
                  {entry.name}: {entry.score}
                  <ol>
                    {entry.items.map((i) => (
                      <li key={i.name}>{i.name}</li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
            <h3>About</h3>
            <p>Each entry is a random draft prediction for an Avenger in a hypothetical draft. The entry receives the square of the absolute value of the number of positions they are off from where the Avenger was actually drafted.</p>
            <p>Thus, if Hulk goes number one overall, and your entry predicts him going fourth, your score for that pick is nine:</p>
            <p><code className="code">(4 - 1) ^ 2 = 9</code></p>
            <p>If the Avenger is drafted in the spot where the entry predicted they would be drafted, then the score for that pick is zero.</p>
            <p>If an Avenger is drafted and they are not listed in the entry at all, then they are scored as if they were predicted to be drafted number <code className="code">{data.PENALTY}</code> overall.</p>
            <p>Thus, if Thor goes number one overall, and you did not predict that he would be drafted, your score for that pick is:</p>
            <p><code className="code">{`(${data.PENALTY} - 1) ^ 2 = ${Math.pow(Math.abs(data.PENALTY - 1), 2)}`}</code></p>
            <p>Lowest score wins.</p>
          </div>
        </div>
      </main>
    </>
  )
}
