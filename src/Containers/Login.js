// REACT
import React from 'react';
import { connect } from 'react-redux';
// LIBRARIES
import PropTypes from 'prop-types';
// COMMON
import history from '~/common/history';
// COMPONENTS
import Login from '~/Components/Login/Login';
// ACTIONS
import { setAccountInfoToState, setAlertToState, clearAllAlertsFromState } from '~/actions';

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
            this.props.setAlertToState({type : 'success', message : "You've been logged in."});
            this.props.setAccountInfoToState({
              publicEthKey : data.publicEthKey,
              email : data.email,
              fullAccount : data.fullAccount,
              loggedIn : true
            });
            setTimeout(()=>{
              history.push(`${APP_ROOT}user-collection`);
              //this.props.clearAllAlertsFromState();
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

  }
}

const mapDispatchToProps = {
  setAccountInfoToState,
  setAlertToState, 
  clearAllAlertsFromState
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

// PROP-TYPES
LoginContainer.propTypes = {
    handleLogin : PropTypes.func.isRequired
};