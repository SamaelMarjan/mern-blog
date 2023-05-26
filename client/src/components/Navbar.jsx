import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  //console.log(user.username);
  const [modal, setModal] = useState(false)

  const showModal = () => {
    setModal(!modal)
  }

  //handle logout
  const logOut = () => {
    dispatch(logout())
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-style">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to={'/'}>Blog</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {
              !user ? <>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/'}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/register'}>Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/login'}>Login</NavLink>
              </li>
              </> : <>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/'}>Home</NavLink>
              </li>
              <li className="nav-item">
              </li>
              <li className="nav-item">
                <Link className="nav-link"  onClick={showModal}>{user?.username}</Link>
              </li>
              {
                modal && 
                <div className="nav-item styleModal">
                  <div className='createPost'>
                    <NavLink className="nav-link text-light" to={'/create'}>Create blog</NavLink>
                  </div>
                  <div className='logoutD'>
                    <NavLink className="nav-link text-light" onClick={logOut}>Logout</NavLink>
                  </div>
                </div>
              }
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar