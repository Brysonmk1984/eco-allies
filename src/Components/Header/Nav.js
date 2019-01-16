// REACT
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/lib/fa';
// ASSETS
import Logo from '~/assets/images/logo2.png';

// COMPONENT
const Nav = function(props){
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav-wrapper">
        <div onClick={() => setOpen(!open)} className={`opaque-backdrop ${open ? 'backdrop-visible' : 'backdrop-hidden'}`}></div>
        <a href ="/" className="brand-logo left">
            <img src={Logo} className="logo" />
        </a>
        <ul id="nav-mobile" className="right hide-on-small-only">
            <li><NavLink to={`${APP_ROOT}gallery`} activeClassName="active">Gallery</NavLink></li>
              { props.loggedIn ? <li><NavLink to={`${APP_ROOT}user-collection`} activeClassName="active">Collection</NavLink></li> : null }
            <li><NavLink to={`${APP_ROOT}faq`} activeClassName="active">FAQ</NavLink></li>
            <li><NavLink to={`${APP_ROOT}about`} activeClassName="active">About</NavLink></li>
            <li><NavLink to={`${APP_ROOT}redeem`} activeClassName="active">Redeem Ally</NavLink></li>
            <li>
                {
                  props.loggedIn ?
                   <span className="account">
                      <a onClick={() => setOpen(!open)} title="Account">
                        <FaUser/>
                      </a>
                      <div onClick={() => setOpen(!open)} className={`account_dropdown ${open ? ' dropdown_open' : ' dropdown_closed' }`}>
                          <ul>
                              <li>
                                  <NavLink to={`${APP_ROOT}account`} activeClassName="active">Account</NavLink>
                              </li>
                              <li>
                                  <a onClick={(e) => {e.preventDefault(); setOpen(!open); props.handleLogin(false); }}>Logout</a>
                              </li>
                          </ul>
                          <div className="arrow_up"></div>
                      </div>
                    </span>
                  :
                  <NavLink to={`${APP_ROOT}register`} activeClassName="active" className="btn-small">Get Started</NavLink>
                }
            </li>
        </ul>
    </nav>
  )
}

export default Nav;

// PROP-TYPES
Nav.propTypes = {
    loggedIn : PropTypes.bool.isRequired,
    handleLogin : PropTypes.func.isRequired
};