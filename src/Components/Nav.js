import React from 'react';
import Logo2 from '../assets/images/logo2.png';
import { NavLink } from 'react-router-dom';

export default class Nav extends React.Component{
    handleLogout(e){
        e.preventDefault();
        this.props.handleLogin(false);
    }
   
    renderUserCollection(){
        if(this.props.loggedIn){
            return (
                <li><NavLink to="/user-collection" activeClassName="active">Collection</NavLink></li>
            );
        }
    }

    renderGettingStarted(){
        if(this.props.loggedIn){
            return <a onClick={this.handleLogout.bind(this)}>Sign Out</a>;
        }else{
            return <NavLink to="/register" activeClassName="active" className="btn-small">Get Started</NavLink>;
        }
    }
    

    render(){
        return(
            <nav className="nav-wrapper">
                <a href ="/" className="brand-logo left">
                    <img src={Logo2} className="logo" />
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
        )
    }
}