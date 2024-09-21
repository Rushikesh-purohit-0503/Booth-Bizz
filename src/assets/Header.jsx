
import '../styles/Dashboard.css'
import React from 'react'
import { Link } from 'react-router-dom'
import userImage from '../assets/user-circle.svg';
function Header({ isLoggedIn }) {
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>BoothBiz</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          {isLoggedIn ? (
            <li><Link to="/dashboard">Dashboard</Link></li>
          ) : (
            <li><Link to="#">Service</Link></li>
          )}
          <li><Link to="#">Contact Us</Link></li>
        </ul>
        {isLoggedIn ? (
          <div className="user-account">
            <div className="account-box">
              <button className="user-account-btn">

                Smit Solanki
                <div className="account-image">
                  <img src={userImage} alt="User" />
                </div>
              </button>
            </div>
            <div className="user-account-content">
              <Link to="#" className="inner-content">Account Details</Link>
              <Link to="#" className="inner-content">Logout</Link>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/signin" className="sign-in" style={{ textDecoration: 'none' }}>Get Started</Link>
           
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header