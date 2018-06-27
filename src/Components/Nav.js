import React from 'react';
import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Nav = () => (
    <nav className="nav-wrapper">
        <a href ="/" className="brand-logo left">
            <img src={Logo} className="logo" />
        </a>
        <ul id="nav-mobile" className="right hide-on-small-only">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/user-collection">Collection</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li>
                <Link to="/gettingStarted" className="btn-small">Get Started</Link>
            </li>
        </ul>
    </nav>
);

export default Nav;