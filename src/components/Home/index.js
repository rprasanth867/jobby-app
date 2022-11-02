import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => (
  <div>
    <Header />
    <div className="home-main-container">
      <div className="home-container">
        <div className="content-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-des">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="nav-link">
            <button className="find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Home
