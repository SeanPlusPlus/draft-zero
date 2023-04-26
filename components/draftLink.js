import Link from 'next/link'

const featured = {
  active: true,
  closed: false,
  description: 'NFL 2023',
  draft_link: '/draft/nfl-2023',
  leaderboard_link: '/leaderboard/nfl-2023',
}

const DraftLink = () => {
  if (!featured.active) {
    return <></>
  }
 
  return (
    <div className="mt-6">
      <div className="card md:w-96 bg-base-100 shadow-xl">
        <div className="card-body pl-3 pr-3 md:pl-8 md:pr-8">
          <h2 className="card-title">{featured.description}</h2>
          <div className="btn-group">
            {!featured.closed && (
              <Link href={featured.draft_link}>
                <a className="btn btn-secondary md:w-40 text-xs">Make your picks</a>
              </Link>
            )}
            <Link href={featured.leaderboard_link}>
              <a className="btn btn-outline md:w-40 text-xs">Live Leaderboard</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraftLink
