import Link from 'next/link'
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const year = '2022'

const DraftLink = () => {
  const { imx } = useContext(GlobalContext)

  if (!imx) {
    return (
      <></>
    )
  }
  
  return (
    <div className="mt-6">
      <Link href={`/nfl/${year}`}>
        <a className="btn btn-secondary">Build your NFL {year} Draft</a>
      </Link>
    </div>
  )
}

export default DraftLink