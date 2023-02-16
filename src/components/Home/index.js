import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-container">
      <Header />
      <div className="home-text-container">
        <h1 className="heading">Find The Job That Fits Your LIfe</h1>
        <p className="paragraph-home">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
