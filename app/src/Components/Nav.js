import React from 'react';
import Logo from '../assets/images/logo.png';

const Nav = () => (
    <nav className="nav-wrapper">
        <a href ="/" className="brand-logo left">
            <img src={Logo} className="logo" />
        </a>
        <ul id="nav-mobile" className="right hide-on-small-only">
            <li><a href ="/about">About</a></li>
            <li><a href ="/about">Trade</a></li>
            <li><a href ="/about">Blog</a></li>
            <li><a href ="/about">FAQ</a></li>
            <li>
                <a href ="/about" className="btn-small btn-flat btn-reverse">Get Started</a>
            </li>
        </ul>
    </nav>
);

export default Nav;