import Link from 'next/link'
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const DraftLink = () => {
  const { imx } = useContext(GlobalContext)

  if (!imx) {
    return (
      <></>
    )
  }
  
  return (
    <div className="mt-6">
      <Link href="/nfl">
        <a className="btn btn-secondary">Build your NFL 2022 Draft</a>
      </Link>
    </div>
  )
}

export default DraftLink