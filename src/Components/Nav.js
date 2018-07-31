import React from 'react';
import Logo2 from '../assets/images/logo2.png';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component{
    handleLogout(e){
        e.preventDefault();
        this.props.handleLogin(false);
    }
   
    

    render(){
        
        return(
            <nav className="nav-wrapper">
                <a href ="/" className="brand-logo left">
                    <img src={Logo2} className="logo" />
                </a>
                <ul id="nav-mobile" className="right hide-on-small-only">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/user-collection">Collection</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li>
                        {
                            this.props.loggedIn ? <a onClick={this.handleLogout.bind(this)}>Sign Out</a>
                            : <Link to="/register" className="btn-small">Get Started</Link>
                        }
                    </li>
                </ul>
            </nav>
        )
    }
}