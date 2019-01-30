// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// ASSETS
import '~/assets/scss/forms.scss';

// COMPONENT
const Register = function(props){

    function renderAddress(){
        if(props.accountType === 'full'){
            return (
                <div className="input_container">
                    <label>
                        <strong>Public Key (Required for Full Accounts):</strong>
                        <input name="publicEthKey" type="text" value={props.publicEthKey} onChange={props.handleChange} placeholder="Enter Ethereum Wallet Public Key" minLength="42" maxLength="42" required />
                    </label>
                </div>
            );
        }
        return false;
    }


    return(
        <div className="page-wrapper form-page register-page">
            <section className="title-section">
                <div className="subsection">
                    <h1>Assemble Your Team</h1>
                    <p>Register Account</p>
                </div>
            </section>
            <section className="form-section">
                <form id="registrationForm" onSubmit={props.handleSubmit}>
                    <div className="input_container">
                        <label>
                            <strong>Account Type:</strong>
                            <p><b>Full accounts</b> require an Ethereum Wallet and Ether to pay for the cost of collecting, trading, and using tokens. <br /> <b>Simple Accounts</b> are not connected to the blockchain, don't require Ethereum Wallets and are free of transaction costs, however tokens cannot be traded.</p>
                            
                            <input type="radio" id="simpleAccount" className="account_type" name="accounttype" value="simple" checked={props.fullAccount === false ? true : false} onChange={props.handleOptionChange}  />
                            <label htmlFor="simpleAccount" className="radio_label">Simple Account</label>

                            <input type="radio" id="fullAccount" className="account_type" name="accounttype" value="full" checked={props.fullAccount === true ? true : false} onChange={props.handleOptionChange}  />
                            <label htmlFor="fullAccount" className="radio_label">Full Account</label>  
                        </label>
                    </div>
                    <div className="input_container">
                        <label>
                            <strong>Username:</strong>
                            <input name="username" type="text" value={props.username} onChange={props.handleChange} placeholder="Enter a Username" minLength="5" maxLength="30" required />
                        </label>
                    </div>
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
                    <div className="input_container">
                        <label>
                            <strong>Confirm Password:</strong>
                            <input name="passwordConfirm" type="password" value={props.passwordConfirm} onChange={props.handleChange} placeholder="Confirm Your Password" minLength="8" maxLength="100" required />
                        </label>
                    </div>
                    { renderAddress() }
                    <div className="input_container register_button_container">
                        <Button type="submit" className="btn btn-primary btn-block">
                            Create Account
                        </Button>
                        <div className="sign_in">
                            Already have an Account? <Link to={`${APP_ROOT}login`}>Sign in</Link>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Register;

// PROP-TYPES
Register.propTypes = {
    username : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired,
    password : PropTypes.string.isRequired,
    passwordConfirm : PropTypes.string.isRequired,
    publicEthKey : PropTypes.string,
    fullAccount : PropTypes.bool.isRequired,
    handleChange : PropTypes.func.isRequired,
    handleOptionChange : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired
};