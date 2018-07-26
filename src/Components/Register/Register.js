import React from 'react';
import { Button } from '@material-ui/core';
import '~/assets/scss/forms.scss';

export default class Register extends React.Component{
    render(){
        return(
            <div className="page-wrapper form-page register-page">
                <section class="title-section">
                    <div className="subsection">
                        <h1>Assemble Your Team</h1>
                        <p>Register Account</p>
                    </div>
                </section>
                <section class="form-section">
                    <form id="registrationForm">
                        <div className="input_container">
                            <label>
                                <strong>Username:</strong>
                                <input type="text" placeholder="Enter a Username" />
                            </label>
                        </div>
                        <div className="input_container">
                            <label>
                                <strong>Email:</strong>
                                <input type="email" placeholder="Enter Email" />
                            </label>
                        </div>
                        <div className="input_container">
                            <label>
                                <strong>Password:</strong>
                                <input type="text" placeholder="Enter Password" />
                            </label>
                        </div>
                        <div className="input_container">
                            <label>
                                <strong>Confirm Password:</strong>
                                <input type="text" placeholder="Confirm Your Password" />
                            </label>
                        </div>
                        <div className="input_container">
                            <label>
                                <strong>Private Key (optional):</strong>
                                <input type="text" placeholder="Enter Ethereum Wallet Public Key" />
                            </label>
                        </div>
                        <div className="input_container register_button_container">
                            <Button className="btn btn-primary btn-block">
                                Create Account
                            </Button>
                        </div>
                    </form>
                </section>
                <section className="bottom-section">
                </section>
            </div>
        );
    }
}