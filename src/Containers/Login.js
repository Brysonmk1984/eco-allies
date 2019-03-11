// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMMON
import history from '~/common/history';
// COMPONENTS
import Login from '~/Components/Login/Login';
// ACTIONS
import { handleLogin, setAccountInfo, setAlert, clearAllAlerts } from '~/actions';

// COMPONENT
class LoginContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            email : '',
            password : ''
        };
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
            this.props.setAccountInfo({
              publicEthKey : data.publicEthKey,
              email : data.email,
              fullAccount : data.fullAccount,
              username : data.username,
              loggedIn : true,
            });
            
            this.props.clearAllAlerts();
            this.props.setAlert({type : 'success', message : "You've been logged in."});
            setTimeout(()=>{
              history.push(`${APP_ROOT}user-collection`);
              this.props.clearAllAlerts();
            },1200);
        }).catch(()=>{return;});
    }

    render(){
        return(
           <Login email={this.state.email} password={this.state.password} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
        );
    }
}

function mapStateToProps(state){
  return {
    alerts : state.alerts
  }
}

const mapDispatchToProps = {
    handleLogin,
    setAccountInfo,
    setAlert, 
    clearAllAlerts
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);