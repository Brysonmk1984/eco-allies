import React from 'react';
import Logo2 from '../assets/images/logo2.png';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/lib/fa';

export default class Nav extends React.Component{
    constructor(){
        super();
            this.state = {
            open: false,
        };
    }
    
    handleToggle() {
        return this.setState(state => ({ open: !this.state.open }));
    };

    handleClose(event) {
        if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };


    handleLogout(e){
        e.preventDefault();
        this.handleToggle();
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
            return (
                <span className="account">
                    <a onClick={this.handleToggle.bind(this)} title="Account">
                    <FaUser/>
                    </a>
                    <div className={`account_dropdown ${this.state.open ? ' dropdown_open' : ' dropdown_closed' }`}>
                        <div>
                            <a onClick={this.handleLogout.bind(this)}>Logout</a>
                        </div>
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