// REACT
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/lib/fa';
// ASSETS
import Logo from '~/assets/images/logo2.png';
import './header.scss';

// COMPONENT
const Nav = function(props){
  const [open, setOpen] = useState(false);
  const [route] = useState('/');

  function manualNavHighlight(matchingRoute){
    return route === matchingRoute ? 'active' : '';
  };

  return (
        <nav className="nav-wrapper">
            <div onClick={() => setOpen(!open)} className={`opaque-backdrop ${open ? 'backdrop-visible' : 'backdrop-hidden'}`}></div>
            <a href ="/" className="brand-logo left">
                <img src={Logo} className="logo" />
            </a>
            <ul id="nav-mobile" className="right hide-on-small-only">
                <li><NavLink to={`${APP_ROOT}gallery`} activeClassName="active" exact><span className={manualNavHighlight('/gallery')}>Gallery</span></NavLink></li>
                <li><NavLink to={`${APP_ROOT}faq`} activeClassName="active" exact><span className={manualNavHighlight('/faq')}>FAQ</span></NavLink></li>
                <li><NavLink to={`${APP_ROOT}about`} activeClassName="active" exact><span className={manualNavHighlight('/about')}>About</span></NavLink></li>
                {
                    props.account.loggedIn ?
                    [
                        <li key="userCollection"><NavLink to={`${APP_ROOT}user-collection`} activeClassName="active"><span className={manualNavHighlight('/user-collection')}>Collection</span></NavLink></li>,
                        <li key="redeem">
                            <NavLink to={`${APP_ROOT}redeem`} activeClassName="active"><span className={manualNavHighlight('/redeem')}>Redeem Ally</span></NavLink>
                        </li>,
                        <li key="account">
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
                        </li>
                    ]
                    :
                    <li>
                        <NavLink to={`${APP_ROOT}register`} activeClassName="active" className="btn-small">Get Started</NavLink>
                    </li>
                }
            </ul>
        </nav>
  )
}

export default Nav;

// PROP-TYPES
Nav.propTypes = {
    account : PropTypes.shape({
        loggedIn : PropTypes.bool.isRequired
    }),
    handleLogin : PropTypes.func.isRequired
};