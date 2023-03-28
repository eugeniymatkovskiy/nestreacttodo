import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/Auth.context'
import '../styles/Header.css'
import Profile from './Profile.components'

export default function Header() {
  const { isAuthenticated, user } = useContext(AuthContext)

  return <div className="container">
  <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <Link to='/' style={{textDecoration: 'none', color: 'black'}}>  
      <span className="fs-4">  
        Welcome to ToDo awesome app!
      </span>
    </Link>
    <div className="col-md-3 text-end">
      {isAuthenticated && user ? <Profile user={user}/> : <>
        <Link to="/auth">
        <button type="button" className="btn btn-outline-primary me-2">Login</button>
      </Link>
      <Link to="/register">
        <button type="button" className="btn btn-outline-success me-2">Sign-up</button>
      </Link>
      </> }
    </div>
  </header>
</div>
}
