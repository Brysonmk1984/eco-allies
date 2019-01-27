// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// COMMON
import { login, logout } from '~/common/loginService';
import history from '~/common/history';
// ASSETS
import '~/assets/scss/forms.scss';

// COMPONENT
export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email : '',
            password : ''
        };
    }

    // Handle logging out of the app
    handleLogout(){
        logout();
    }

    // Handle change of form elements and update states
    handleChange(e){
        const newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(() => (newState));
    }

    // Handle submit of form: send form data to back end, which handles app login logic
    // If login success, navigate to user-collection, otherwise display error message
    handleSubmit(e){
        e.preventDefault();

        this.props.handleLogin(true, this.state.email, this.state.password)
        .then((data) =>{
            console.log('in then hs', data);
            this.props.modifyAppState({
                loggedIn : true,
                fullAccount : data.fullAccount,
                account : data.publicEthKey,
                alerts : [{type : 'success', message : "You've been logged in."}]
            }, () =>{
                setTimeout(()=>{
                    history.push(`${APP_ROOT}user-collection`);
                    this.props.modifyAppState({alerts : []});
                },1200);
            });
        });
    }

    render(){
        return(
            <div className="page-wrapper form-page login-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>Login</h1>
                    </div>
                </section>
                <section className="form-section">
                    <form id="loginForm" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="input_container">
                        <label>
                                <strong>Email:</strong>
                                <input name="email" type="email" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="Enter Email" minLength="4" maxLength="100" required />
                            </label>
                        </div>
                        <div className="input_container">
                            <label>
                                <strong>Password:</strong>
                                <input name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Enter Password" minLength="8" maxLength="100" required />
                            </label>
                        </div>
                        <div className="input_container register_button_container">
                            <Button type="submit" className="btn btn-primary btn-block">
                                Sign in
                            </Button>
                            <div className="register_account">
                                <strong>OR</strong><br />
                                <Link  to={`${APP_ROOT}register`} >Create a new account</Link>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

// PROP-TYPES
Login.propTypes = {
    alerts : PropTypes.arrayOf(PropTypes.shape({ type : PropTypes.string.isRequired, message : PropTypes.string.isRequired })).isRequired,
    loggedIn : PropTypes.bool.isRequired,
    modifyAppState : PropTypes.func.isRequired,
    handleLogin : PropTypes.func.isRequired
};