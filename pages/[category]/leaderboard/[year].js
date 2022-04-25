import {useRouter} from 'next/router'

// components
import Header from '../../../components/header'
import Nav from '../../../components/nav'

export default function Leaderboard() {
  const router = useRouter()
  const { query: { year, category }} = router
  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <Nav />
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">{category.toUpperCase()} {year} Leaderboard</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
