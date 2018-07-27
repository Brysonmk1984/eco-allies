import React from 'react';
import { Button } from '@material-ui/core';
import { login } from '~/common/loginService';
import '~/assets/scss/forms.scss';


export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email : '',
            password : '',
            errors : [],
            successfulLogin : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        login({email : this.state.email, password : this.state.password})
        .then((data) =>{console.log('in then hs', data);
            if(data.error){
                const errors = data.error.map((e) =>{
                    return {type:e.type, message:e.message}
                });
                this.handleErrors(errors);
            }else{console.log(2);
                this.setState(()=>({successfulLogin: true}), () => {
                    //setTimeout(()=>(window.location = "/user-collection"),1500);
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
        if(this.state.successfulLogin){
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