import React from 'react';
import { Button } from '@material-ui/core';
import '~/assets/scss/forms.scss';

export default class Login extends React.Component{
    render(){
        return(
            <div className="page-wrapper form-page login-page">
                <section class="title-section">
                    <div className="subsection">
                        <h1>Login</h1>
                    </div>
                </section>
                <section class="form-section">
                    <form id="registrationForm">
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
                        <div className="input_container register_button_container">
                            <Button className="btn btn-primary btn-block">
                                Login
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