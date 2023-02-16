import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div>
        <Link className="link-text" to="/">
          <button type="button" className="website-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </button>
        </Link>
      </div>
      <ul className="links-items">
        <Link className="link-text" to="/">
          <li> Home </li>
        </Link>
        <Link className="link-text" to="/jobs">
          <li> Jobs </li>
        </Link>
      </ul>
      <div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
