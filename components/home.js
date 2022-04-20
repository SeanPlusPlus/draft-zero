// components
import Login from './login'

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Draft Zero</h1>
          <p className="py-6">
            Build a prediction for any draft
          </p>
          <Login />
        </div>
      </div>
    </div>
  )
}

export default Home
