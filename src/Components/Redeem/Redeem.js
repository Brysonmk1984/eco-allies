// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// ASSETS
import './redeem.scss';


// COMPONENT
export default class Redeem extends React.Component{
  constructor(){
    super();
      this.state = {
          code : '',
          confirmed : false,
          errors : [],
          email : '',
          publicEthKey : ''
      };
  }

  // Handle change of form elements and update states
  handleChange(e){
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(() => (newState));
  }
  handleCheckboxToggle(e){
    const newState = {};
    newState.confirmed = e.target.checked;
    this.setState(() => (newState));
  }

    // Handle submit of form: send form data to back end, which handles app login logic
    // If token is successfully redeemed, add token to blockchain for user and navigate to collection page, otherwise display error message
    handleSubmit(e){
      e.preventDefault();

      if(this.state.errors.length){
          this.setState(()=>({errors : []}));
      }

      this.props.handleRedeem(true, this.state.code)
      .then((data) =>{
          console.log('in then handleRedeem', data);
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
                      //history.push(`${APP_ROOT}user-collection`);
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

  // Handle errors from server
  handleErrors(errors){alert(1);
    this.setState(()=>({errors : [...this.state.errors, ...errors]}));
  }

  // Render alert status messages
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

  // Render success alert message
  renderSuccessSection(){
    if(this.props.loggedIn){
        return(
            <div className="notification notification-success">
                <strong>Success! : </strong> <span>You've been logged in.</span>
            </div>
        )
    }
    
  }

  // When component mounts, retrieve details about the account from the database
  // Does NOT include blockchain data
  componentDidMount(){
    this.props.getAccountDetails()
    .then((data) =>{
          if(data.data){
              const { email, publicEthKey } = data.data;
              this.setState(()=>({ email, publicEthKey }));
          }
    });
  }

  render(){
      return(
          <div className="page-wrapper form-page redeem-page">
              <section className="alert-section">
                  {this.renderAlertSection()}
                  {this.renderSuccessSection()}
              </section>
              <section className="form-section">
                  <div className="subsection">
                      <h2>Unlock your Ally</h2>
                      <p>Codes are aquired by sending proof of your own positive impact</p>
                  </div>
                  <form id="redeemForm" onSubmit={this.handleSubmit.bind(this)}>
                      <div className="input_container">
                        <label>
                            <strong>Code:</strong>
                            <input name="code" type="text" value={this.state.code} onChange={this.handleChange.bind(this)} placeholder="Enter Nine-Digit Code" minLength="9" maxLength="9" required />
                        </label>
                      </div>
                      <div className="input_container">
                          <label>
                            <input id="confirmCheck" name="confirmed" type="checkbox" checked={this.state.confirmed}  onChange={this.handleCheckboxToggle.bind(this)} required />
                            <strong>  I understand the code and ally will be associated with my account.</strong>
                          </label>
                      </div>
                      <Button type="submit" className="btn btn-primary btn-block">
                        submit
                      </Button>
                  </form>
        
              </section>
          </div>
      );
  }
}

// PROP-TYPES
Redeem.propTypes = {
  handleRedeem : PropTypes.func.isRequired
};