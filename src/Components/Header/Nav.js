// REACT
import React from 'react';
import { NavLink } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/lib/fa';
// ASSETS
import Logo from '~/assets/images/logo2.png';

// COMPONENT
export default class Nav extends React.Component{
    constructor(){
        super();
        this.state = {
            open: false,
        };
    }
    
    // Sets state that toggles the open / close of the account subnav
    handleToggle() {
        return this.setState(state => ({ open: !this.state.open }));
    };

    // Handles logging out and navigating to account page
    handleLogout(e){
        e.preventDefault();
        this.handleToggle();
        this.props.handleLogin(false);
    }
   
    // If logged in, render Collection link
    renderUserCollection(){
        if(this.props.loggedIn){
            return (
                <li><NavLink to="/user-collection" activeClassName="active">Collection</NavLink></li>
            );
        }
    }

    // If logged in, render account button, otherwise render getting started button
    renderGettingStarted(){
        if(this.props.loggedIn){
            return (
                <span className="account">
                    <a onClick={this.handleToggle.bind(this)} title="Account">
                    <FaUser/>
                    </a>
                    <div onClick={this.handleToggle.bind(this)} className={`account_dropdown ${this.state.open ? ' dropdown_open' : ' dropdown_closed' }`}>
                        <ul>
                            <li>
                                <NavLink to="/account" activeClassName="active">Account</NavLink>
                            </li>
                            <li>
                                <a onClick={this.handleLogout.bind(this)}>Logout</a>
                            </li>
                        </ul>
                        <div className="arrow_up"></div>
                    </div>
                </span>
            );
        }else{
            return <NavLink to="/register" activeClassName="active" className="btn-small">Get Started</NavLink>;
        }
    }

    render(){
        return(
            <nav className="nav-wrapper">
                <div onClick={this.handleToggle.bind(this)} className={`opaque-backdrop ${this.state.open ? 'backdrop-visible' : 'backdrop-hidden'}`}></div>
                <a href ="/" className="brand-logo left">
                    <img src={Logo} className="logo" />
                </a>
                <ul id="nav-mobile" className="right hide-on-small-only">
                    <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                    <li><NavLink to="/gallery" activeClassName="active">Gallery</NavLink></li>
                    { this.renderUserCollection() }
                    <li><NavLink to="/faq" activeClassName="active">FAQ</NavLink></li>
                    <li>
                        { this.renderGettingStarted() }
                    </li>
                </ul>
            </nav>
        );
    }
}

// PROP-TYPES
Nav.propTypes = {
    loggedIn : PropTypes.bool.isRequired,
    handleLogin : PropTypes.func.isRequired
};