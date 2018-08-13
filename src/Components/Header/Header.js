// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import Nav from './Nav';
// ASSETS
import './header.scss';

// COMPONENT
const Header = (props) => (
    <header>
        <Nav handleLogin={props.handleLogin}  loggedIn={props.loggedIn} />
    </header>
);

// PROP-TYPES
Header.propTypes = {
    loggedIn : PropTypes.bool.isRequired,
    handleLogin : PropTypes.func.isRequired
};

export default Header;