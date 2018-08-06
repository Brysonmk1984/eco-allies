import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { login, logout } from '~/common/loginService';
import history from '~/common/history';
import '~/assets/scss/forms.scss';


export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email : '',
            password : '',
            errors : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogout(){
        logout();
    }

    handleChange(e){
        const newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(() => (newState));
    }
    handleSubmit(e){
        e.preventDefault();

        if(this.state.errors.length){
            this.setState(()=>({errors : []}));
        }

        this.props.handleLogin(true, this.state.email, this.state.password)
        .then((data) =>{
            //console.log('in then hs', data);
            if(data.error){
                const errors = data.error.map((e) =>{
                    return {type:e.type, message:e.message}
                });
                this.handleErrors(errors);
            }else{
               
                    
                this.props.modifyAppState({
                    loggedIn : true, 
                    account : data.publicEthKey
                }, () =>{
                    setTimeout(()=>{
                        history.push('/user-collection');
                    },1000);
                });
            } 
            
        })
        .catch((error) =>{
            if(error){
                this.handleErrors([{type:error.type, message:error.message}])
            }
        });
    }

    handleErrors(errors){
        this.setState(()=>({errors : [...this.state.errors, ...errors]}));
    }

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
    renderSuccessSection(){
        if(this.props.loggedIn){
            return(
                <div className="notification notification-success">
                    <strong>Success! : </strong> <span>You've been logged in.</span>
                </div>
            )
        }
        
    }



    render(){
        return(
            <div className="page-wrapper form-page login-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>Login</h1>
                    </div>
                </section>
                <section className="alert-section">
                    {this.renderAlertSection()}
                    {this.renderSuccessSection()}
                </section>
                <section className="form-section">
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <div className="input_container">
                        <label>
                                <strong>Email:</strong>
                                <input name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter Email" minLength="4" maxLength="100" required />
                            </label>
                        </div>
                        <div className="input_container">
                            <label>
                                <strong>Password:</strong>
                                <input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter Password" minLength="8" maxLength="100" required />
                            </label>
                        </div>
                        <div className="input_container register_button_container">
                            <Button type="submit" className="btn btn-primary btn-block">
                                Sign in
                            </Button>
                            <div className="register_account">
                                <strong>OR</strong><br />
                                <Link to="/register">Create a new account</Link>
                            </div>
                        </div>
                    </form>
                </section>
                <section className="bottom-section">
                </section>
            </div>
        );
    }
}