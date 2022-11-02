import './index.css'

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-content-container">
        <Link to="/" className="nav-link">
          <img
            className="nav-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-lg-link-container">
          <Link to="/" className="nav-link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <button
          className="nav-lg-button"
          type="button"
          onClick={onClickLogoutButton}
        >
          Logout
        </button>
        <ul className="nav-sm-link-container">
          <Link to="/" className="nav-link">
            <li>
              <AiFillHome className="nav-sm-item" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>
              <BsBriefcaseFill className="nav-sm-item" />
            </li>
          </Link>
          <li>
            <button
              className="nav-sm-button"
              type="button"
              onClick={onClickLogoutButton}
            >
              <FiLogOut className="nav-sm-item" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
