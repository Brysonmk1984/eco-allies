// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// COMMON
import history from '~/common/history';
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
          tokenCreated : false
      };
  }

  // Handle change of form elements and update states
  handleChange(e){
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(() => (newState));
  }
  handleCheckboxToggle(e){
    e.persist();
    this.setState(() => ({confirmed : e.target.checked}));
  }

    // Handle submit of form: send form data to back end, which handles app login logic
    // If token is successfully redeemed, add token to blockchain for user and navigate to collection page, otherwise display error message
    handleSubmit(e){
      e.preventDefault();

      if(this.state.errors.length){
          this.setState(()=>({errors : []}));
      }

      this.props.handleRedeem(this.state.code, this.state.email)
      .then((data) =>{
          console.log('in then handleRedeem', data);
          if(data.error){
              this.handleErrors([data.error]);
          }else{
            this.props.buildAlly();
            // this.setState(()=>({tokenCreated : true}));
            // setTimeout(()=>{
            //     history.push(`${APP_ROOT}user-collection`);
            // },1000);

          } 
          
      })
      .catch((error) =>{
          if(error){
              this.handleErrors([{type:error.type, message:error.message}])
          }
      });

  }

  // Handle errors from server
  handleErrors(errors){console.log('ERRORS', errors);
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
    if(this.state.tokenCreated){
      return(
        <div className="notification notification-success">
            <strong>Success! : </strong> <span>And your new Ally is...</span>
        </div>
      )
    }
  }

  // When component mounts, retrieve details about the account from the database
  // And if there's a qrCode param, use it to retrieve the 9 digit code to retrieve ally
  componentDidMount(){
    const defaultState = {};
    const promises = [];

    const p1 = this.props.getAccountDetails()
    promises.push(p1);

    if(this.props.match && this.props.match.params.qr){
        const p2 = this.props.checkParamAgainstCode(this.props.match.params.qr)
        promises.push(p2);
    }

    Promise.all(promises)
    .then((values) =>{
        console.log('VALs', values);
        defaultState.email = values[0].data.email;
        
        // If there was a qr code url param
        if(values[1]){
            defaultState.code = values[1].code;
        }

        this.setState(()=>(defaultState));
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
                      <p>Codes are aquired by <Link  to={`${APP_ROOT}proof`} >sending proof</Link> of your own positive impact</p>
                  </div>
                  <form id="redeemForm" onSubmit={this.handleSubmit.bind(this)}>
                      <div className="input_container">
                        <label id="codeLabel">
                            <strong>Code:</strong>
                            <input id="codeInput" name="code" type="text" value={this.state.code} onChange={this.handleChange.bind(this)} placeholder="Nine-Digit Code" minLength="9" maxLength="9" required />
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
  handleRedeem : PropTypes.func.isRequired,
  checkParamAgainstCode : PropTypes.func.isRequired,
  getAccountDetails : PropTypes.func.isRequired,
  buildAlly : PropTypes.func.isRequired,
  match : PropTypes.object.isRequired
};