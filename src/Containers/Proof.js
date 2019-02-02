// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import Proof from '~/Components/Proof/Proof';
// ACTIONS
import { setAlert, handleProof } from '~/actions/index.js';


class ProofContainer extends React.Component{
  constructor(){
    super();
    this.state = {
      uploaded : false,
      confirmed : false,
      message : ''
    };

  }

  // Handle change of form elements and update states
  handleChange(e){
    e.persist();
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
  handleSubmit(inputs){

    const formData = new FormData();
    formData.append('file', inputs.uploadInput.files[0]);
    formData.append('filename', inputs.fileName.value);
    formData.append('message', this.state.message);

    this.props.handleProof(formData)
    .then((data) =>{
      this.props.setAlert({type : 'success', message : 'Your document has been submitted. Please allow 48 hours for processing.'});
      const top = document.getElementById("alertWrapper").offsetTop;
      window.scrollTo(0, top);
      
    })
  
  }

  render(){
    return(
       <Proof message={this.state.message} uploaded={this.state.uploaded} confirmed={this.state.confirmed} handleSubmit={this.handleSubmit.bind(this)} handleCheckboxToggle={this.handleCheckboxToggle.bind(this)} handleChange={this.handleChange.bind(this)} />
    );
  }
}

function mapStateToProps(state){
 return {
   alerts : state.alerts
 }
}
const mapDispatchToProps = {
  setAlert,
  handleProof
};

export default connect(mapStateToProps, mapDispatchToProps)(ProofContainer);