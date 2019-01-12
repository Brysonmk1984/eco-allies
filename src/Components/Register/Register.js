// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// COMMON
import { register } from '~/common/loginService';
import history from '~/common/history';
// ASSETS
import '~/assets/scss/forms.scss';

// COMPONENT
export default class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            username : '',
            email : '',
            password : '',
            passwordConfirm : '',
            publicEthKey : '',
            accountType : 'simple',
            errors : [],
            successfulAccountCreation : false
        };
    }

    // Handle Change of form
    handleChange(e){
        const newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(() => (newState));
    }

    // Handle submit of for form. If success, the backend creates a new account. Otherwise, handle errors
    handleSubmit(e){
        e.preventDefault();
        if(this.state.password === this.state.passwordConfirm){
            if(this.state.errors.length){
                this.setState(()=>({errors : []}));
            }
            register(this.state)
            .then((data) =>{console.log('in then hs', data);
                if(data.error){
                    const errors = data.error.map((e) =>{
                        return {type:e.error.type, message:e.error.message}
                    });
                    this.handleErrors(errors);
                }else{
                    this.setState(()=>({successfulAccountCreation: true}), () => {
                        var top = document.getElementById("registerPageAlert").offsetTop;
                        window.scrollTo(0, top);
                    });
                }
                
            })
            .catch((error) =>{
                if(error){
                    this.handleErrors([{type:error.type, message:error.message}])
                }
            });
        }else{
            this.handleErrors([{type:'password',message:'Passwords do Not Match'}]);
        }
        
    }
    handleOptionChange(e){
        this.setState({
            accountType : e.target.value
        });
    }

    // Handle errors in the state
    handleErrors(errors){
        this.setState(()=>({errors : [...this.state.errors, ...errors]}));
    }

    // Render error allert sections
    renderAlertSection(){
        if(this.state.errors.length){
            const errorEls = this.state.errors.map((error, i) =>(
                    <div className="notification notification-error" key={i}>
                        <strong>ERROR : </strong> <span>{error.message}</span>
                    </div>
                )
            )
            return errorEls;
        }
    }

    // Render success alert section
    renderSuccessSection(){
        if(this.state.successfulAccountCreation){
            setTimeout(()=>{
                this.props.modifyAppState({loggedIn : true});
                history.push(`${APP_ROOT}user-collection`);
            },1500);
            return(
                <div id="registerPageAlert" className="notification notification-success">
                    <strong>Success! : </strong> <span>Your Account has been created!</span>
                </div>
            )
        }
        
    }

    renderAddress(){
        if(this.state.accountType === 'full'){
            return (
                <div className="input_container">
                    <label>
                        <strong>Public Key (Required for Full Accounts):</strong>
                        <input name="publicEthKey" type="text" value={this.state.publicEthKey} onChange={this.handleChange.bind(this)} placeholder="Enter Ethereum Wallet Public Key" minLength="42" maxLength="42" required />
                    </label>
                </div>
            );
        }
        return false;
    }

    // If there are new errors, rerender the alert section
    componentDidUpdate(prevProps, prevState){
        if(prevState.errors.length !== this.state.errors.length){
            this.renderAlertSection();
        }
      
    }




    render(){
        return(
            <div className="page-wrapper form-page register-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>Assemble Your Team</h1>
                        <p>Register Account</p>
                    </div>
                </section>
                <section className="alert-section">
                    {this.renderAlertSection()}
                    {this.renderSuccessSection()}
                </section>
                <section className="form-section">
                    <form id="registrationForm" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="input_container">
                            <label>
                                <strong>Account Type:</strong>
                                <p><b>Full accounts</b> require an Ethereum Wallet and Ether to pay for the cost of collecting, trading, and using tokens. <br /> <b>Simple Accounts</b> are not connected to the blockchain, don't require Ethereum Wallets and are free of transaction costs, however tokens cannot be traded.</p>
                            
                         
                           
                            <input type="radio" id="simpleAccount" className="account_type" name="accounttype" value="simple" checked={this.state.accountType === 'simple' ? true : false} onChange={this.handleOptionChange.bind(this)}  />
                            <label htmlFor="simpleAccount" className="radio_label">Simple Account</label>
                        
                        
                            <input type="radio" id="fullAccount" className="account_type" name="accounttype" value="full" checked={this.state.accountType === 'full' ? true : false} onChange={this.handleOptionChange.bind(this)}  />
                            <label htmlFor="fullAccount" className="radio_label">Full Account</label>  
                            </label>
                                                  
                            
                        </div>
                        <div className="input_container">
                            <label>
                                <strong>Username:</strong>
                                <input name="username" type="text" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="Enter a Username" minLength="5" maxLength="30" required />
                            </label>
                        </div>
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
                        <div className="input_container">
                            <label>
                                <strong>Confirm Password:</strong>
                                <input name="passwordConfirm" type="password" value={this.state.passwordConfirm} onChange={this.handleChange.bind(this)} placeholder="Confirm Your Password" minLength="8" maxLength="100" required />
                            </label>
                        </div>
                        { this.renderAddress() }
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
}

// PROP-TYPES
Register.propTypes = {
    modifyAppState : PropTypes.func.isRequired,
    loggedIn : PropTypes.bool.isRequired
};