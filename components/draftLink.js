import Link from 'next/link'
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const featured ={
  description: 'NFL 2022',
  draft_link: '/draft/nfl-2022',
  leaderboard_link: '/leaderboard/nfl-2022',
}
const DraftLink = () => {
  const { imx } = useContext(GlobalContext)

  // if (!imx) {
  //   return (
  //     <></>
  //   )
  // }
  
  return (
    <div className="mt-6">
      <div className="card md:w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{featured.description}</h2>
          <div className="btn-group">
            <Link href={featured.draft_link}>
              <a className="btn btn-outline md:w-40">Draft</a>
            </Link>
            <Link href={featured.leaderboard_link}>
              <a className="btn btn-outline md:w-40">Leaderboard</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraftLink