// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import Nav from './Nav';
// ASSETS
import './header.scss';
import beltBuckle from '~/assets/images/layout/belt_buckle.png';

// COMPONENT
const Header = (props) => (
    <header>
        <Nav handleLogin={props.handleLogin}  loggedIn={props.loggedIn} />
        <div className="brand">
            <h1>ECO ALLIES</h1>
            <p>Defenders of Gaia</p>
        </div>
        <div className="belt">
            {/* <img className="belt_buckle" src={beltBuckle} /> */}
        </div>
    </header>
);

// PROP-TYPES
Header.propTypes = {
    loggedIn : PropTypes.bool.isRequired,
    handleLogin : PropTypes.func.isRequired
};

export default Header;