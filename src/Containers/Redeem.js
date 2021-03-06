// REACT
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
// LIBRARIES
import PropTypes from 'prop-types';
// COMMON
import history from '~/common/history';
// COMPONENTS
import Redeem from '~/Components/Redeem/Redeem';
// ACTIONS
import { setAlert, clearAllAlerts, buildAlly, handleRedeem, handleCheckParamAgainstCode } from '~/actions/index.js';

// COMPONENT
class RedeemContainer extends React.Component{
  constructor(){
    super();
      this.state = {
          code : '',
          confirmed : false,
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

    this.props.handleRedeem(this.state.code, this.props.account.email)
    .then((data) =>{
        if(data.error){
            this.props.setAlert(data.error);
        }else{
          
          this.props.buildAlly()
          .then((data) =>{console.log('D here',data);
            if(data && data.receipt){
              
              this.props.clearAllAlerts();
              this.props.setAlert({ type : 'success', message : 'Token successfully created!' });
              setTimeout(()=>{
                  history.push(`${APP_ROOT}user-collection`);
              },1200);
            }else{
              this.props.setAlert({type : 'error', message : 'There was an error communicating with the blockchain.'});
            }

          })
          .catch((error) =>{
            if(error){
                this.props.setAlert({type : 'error', message : error});
              }
          });
          
          

        } 
        
    })
    .catch((error) =>{
      if(error){
          this.props.setAlert(error);
        }
    });

  }


  // Before component mounts, if there's a qrCode param, use it to retrieve the 9 digit code to retrieve ally
  componentWillMount(){
    if(this.props.match && this.props.match.params.qr){
      this.props.handleCheckParamAgainstCode(this.props.match.params.qr)
       .then((values) =>{
          this.setState({ code : values.code });
      })
    }

  }

  render(){
      return(
          <Redeem account={this.props.account} confirmed={this.state.confirmed} code={this.state.code} handleRedeem={this.props.handleRedeem.bind(this)} handleCheckboxToggle={this.handleCheckboxToggle.bind(this)} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
      );
  }
}

function mapStateToProps(state){
  return {
    account : state.account
  }
}

const mapDispatchToProps = {
  setAlert,
  clearAllAlerts,
  buildAlly,
  handleCheckParamAgainstCode,
  handleRedeem
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RedeemContainer));

// PROP-TYPES
Redeem.propTypes = {
    match : PropTypes.object
};