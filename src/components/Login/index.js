import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    loginFailure: false,
    errorMsg: '',
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({loginFailure: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {usernameInput, passwordInput, loginFailure, errorMsg} = this.state
    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label htmlFor="username" className="login-label">
            USERNAME
          </label>
          <input
            id="username"
            className="login-input"
            type="text"
            placeholder="Username"
            value={usernameInput}
            onChange={this.onChangeUsernameInput}
          />
          <label htmlFor="password" className="login-label">
            PASSWORD
          </label>
          <input
            id="password"
            className="login-input"
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={this.onChangePasswordInput}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {loginFailure && <p className="login-error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
