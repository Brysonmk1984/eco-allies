// REACT
import React from 'react';
import { connect } from 'react-redux';
// LIBRARIES
import PropTypes from 'prop-types';
// COMMON
import { register } from '~/common/loginService';
import history from '~/common/history';
// COMPONENTS
import Register from '~/Components/Register/Register';
// ACTIONS
import { setLsJwt, setAccountInfo, setAlert, clearAllAlerts } from '~/actions';

// COMPONENT
class RegisterContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            username : '',
            email : '',
            password : '',
            passwordConfirm : '',
            publicEthKey : '',
            fullAccount : false
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
            register({
                username : this.state.username,
                email : this.state.email,
                password : this.state.password,
                passwordConfirm : this.state.passwordConfirm,
                publicEthKey : this.state.publicEthKey,
                fullAccount : this.state.fullAccount,
            })
            .then((data) =>{console.log('in then hs', data);
                if(data.error){
                    const errors = data.error.map((e) =>{console.log('E', e);
                        return {type:e.type, message:e.message};
                    });
                    this.props.setAlert(errors);
                    const top = document.getElementById("alertWrapper").offsetTop;
                    window.scrollTo(0, top);
                }else{
                  this.props.setAlert({type : 'success', message : 'Account successfully created!'});
                  const top = document.getElementById("alertWrapper").offsetTop;
                  window.scrollTo(0, top);
                  this.props.setAccountInfo({
                    publicEthKey : data.publicEthKey,
                    email : data.email,
                    fullAccount : data.fullAccount,
                    username : data.username,
                    loggedIn : true,
                  });
                  setLsJwt(data.token);
                  setTimeout(()=>{
                      history.push(`${APP_ROOT}user-collection`);
                      this.props.clearAllAlerts();
                  },1200);
                }
                
            });
        }else{
            this.props.setAlert({type:'error',message:'Passwords do Not Match'});
            const top = document.getElementById("alertWrapper").offsetTop;
            window.scrollTo(0, top);
        }
        
    }
    handleOptionChange(e){
        this.setState({
            fullAccount : e.target.value === 'full' ? true : false
        });
    }

    

    render(){
        return(
          <Register
          username={this.state.username}
          email={this.state.email}
          password={this.state.password}
          passwordConfirm={this.state.passwordConfirm}
          publicEthKey={this.state.publicEthKey}
          fullAccount={this.state.fullAccount}
          handleChange={this.handleChange.bind(this)}
          handleOptionChange={this.handleOptionChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          />
        );
    }
}

function mapStateToProps(){
  return {
    
  }
}

const mapDispatchToProps = {
  setAlert,
  setAccountInfo,
  clearAllAlerts
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);

// PROP-TYPES
Register.propTypes = {

};