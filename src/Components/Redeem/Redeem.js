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

      this.props.handleRedeem(this.state.code, this.state.email)
      .then((data) =>{
          if(data.error){
              this.props.modifyAppState({alerts : [data.error]})
          }else{
            this.props.buildAlly();
            //this.props.modifyAppState({alerts : [{ type : 'success', message : 'Token successfully created!' }]})
            // setTimeout(()=>{
            //     history.push(`${APP_ROOT}user-collection`);
            // },1200);

          } 
          
      })
      .catch((error) =>{
          if(error){
              this.props.modifyAppState({alerts : [error]})
            }
      });

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

        this.setState(defaultState);
    });


  }

  render(){
      return(
          <div className="page-wrapper form-page redeem-page">
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
    alerts : PropTypes.arrayOf(PropTypes.shape({ type : PropTypes.string.isRequired, message : PropTypes.string.isRequired })).isRequired,
    modifyAppState : PropTypes.func.isRequired,
    handleRedeem : PropTypes.func.isRequired,
    checkParamAgainstCode : PropTypes.func,
    getAccountDetails : PropTypes.func.isRequired,
    buildAlly : PropTypes.func.isRequired,
    match : PropTypes.object
};