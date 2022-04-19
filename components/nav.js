import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter()
  const { pathname } = router

  return (
    <div className="navbar mb-8 shadow-lg bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">
            Draft<span role="img" aria-label="zero" className="ml-2">0️⃣</span>
          </a>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link href="/">
          <a className={`mr-2 link ${pathname !== '/' && 'link-hover'}`}>Home</a>
        </Link>
      </div>
    </div>
  )
}

export default Nav 
