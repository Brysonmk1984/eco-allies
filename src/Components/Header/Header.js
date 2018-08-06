import React from 'react';
import Nav from './Nav';
import './header.scss';

const Header = (props) => (
    <header>
        <Nav handleLogin={props.handleLogin}  loggedIn={props.loggedIn} />
    </header>
);

export default Header;