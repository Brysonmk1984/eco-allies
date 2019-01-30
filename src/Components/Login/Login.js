// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// ASSETS
import '~/assets/scss/forms.scss';

// COMPONENT
const Login = function(props){
    return(
        <div className="page-wrapper form-page login-page">
            <section className="title-section">
                <div className="subsection">
                    <h1>Login</h1>
                </div>
            </section>
            <section className="form-section">
                <form id="loginForm" onSubmit={props.handleSubmit}>
                    <div className="input_container">
                    <label>
                            <strong>Email:</strong>
                            <input name="email" type="email" value={props.email} onChange={props.handleChange} placeholder="Enter Email" minLength="4" maxLength="100" required />
                        </label>
                    </div>
                    <div className="input_container">
                        <label>
                            <strong>Password:</strong>
                            <input name="password" type="password" value={props.password} onChange={props.handleChange} placeholder="Enter Password" minLength="8" maxLength="100" required />
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

export default Login;

// PROP-TYPES
Login.propTypes = {
    email : PropTypes.string.isRequired,
    password : PropTypes.string.isRequired,
    handleChange : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired
};