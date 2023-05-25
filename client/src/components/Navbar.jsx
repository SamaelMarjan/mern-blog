import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './style.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-style">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to={'/'}>Blog</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={'/'}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/create'}>Create blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/register'}>Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/login'}>Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link">Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar