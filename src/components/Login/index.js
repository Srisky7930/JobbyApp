import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg,
      showErrorMsg: true,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrls = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrls, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <div className="username-container">
            <label htmlFor="username" className="user-label">
              USERNAME
            </label>
            <input
              value={username}
              placeholder="Username"
              id="username"
              type="text"
              className="user-input"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="password-container">
            <label htmlFor="password" className="password-label">
              PASSWORD
            </label>
            <input
              value={password}
              placeholder="Password"
              id="password"
              type="password"
              className="password-input"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-msg"> *{errorMsg} </p>}
        </form>
      </div>
    )
  }
}

export default Login
