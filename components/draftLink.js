import Link from 'next/link'
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const draft_name = 'nfl-2022'

const DraftLink = () => {
  const { imx } = useContext(GlobalContext)

  if (!imx) {
    return (
      <></>
    )
  }
  
  return (
    <div className="mt-6">
      <Link href={draft_name}>
        <a className="btn btn-secondary">Build your {draft_name} Draft</a>
      </Link>
    </div>
  )
}

export default DraftLink