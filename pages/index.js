import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [data, setData] = useState({ items: [], draft: [], entries: [] });

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
            <h3>Draft</h3>
            <ol>
              {data.draft.map((item, idx) => (
                <li key={item.name}>
                  {item.name}
                  <ul>
                    {
                      data.entries.map((entry) => (
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
                <li key={entry.name}>
                  {entry.name}: {entry.score}
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
      </main>
      <footer className="footer">
        <a href="https://github.com/SeanPlusPlus/draft-zero">Github</a>
      </footer>
    </div>
  )
}
