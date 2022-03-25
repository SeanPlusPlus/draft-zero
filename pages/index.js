import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import scores from '../utils/scores'

const getScores = (item, entry) => {
  const { score, floor, ceiling } = scores(item, entry)
  return (
    <ul>
      <li>
        score: {score}
      </li>
      <li>
        floor: {floor}
      </li>
      <li>
        ceiling: {ceiling}
      </li>
    </ul>
  )
}

export default function Home() {
  const [data, setData] = useState({ items: [], draft: [], entries: [] });

  useEffect(async () => {
    const result = await axios(
      '/api/hello',
    );

    setData(result.data);
  }, []);

  return (
    <div className={styles.container}>
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
          </div>
          <div className="column">
            <h3>Entries</h3>
            <ul>
              {data.entries.map((entry) => (
                <li key={entry.name}>
                  {entry.name}
                  <ol>
                    {entry.items.map((i) => (
                      <li key={i.name}>{i.name}</li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <h3>Draft</h3>
        <ol>
          {data.draft.map((item) => (
            <li key={item.name}>
              {item.name}
              <ul>
                {
                  data.entries.map((entry) => (
                    <li key={entry.name}>
                      {entry.name}
                      {getScores(item, entry)}
                    </li>
                  ))
                }
              </ul>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
