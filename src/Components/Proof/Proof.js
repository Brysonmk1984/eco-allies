// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// STYLES
import './proof.scss';
import axios from 'axios';
export default class Proof extends React.Component{
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
  handleSubmit(e){
    e.preventDefault();


    const formData = new FormData();
    formData.append('file', this.uploadInput.files[0]);
    formData.append('filename', this.fileName.value);
    formData.append('message', this.state.message);

    this.props.handleProof(formData)
    .then((data) =>{
      console.log('PROOF DATA', data);
      this.props.modifyAppState({alerts : [{type : 'success', message : 'Your document has been submitted. Please allow 48 hours for processing.'}]}, () =>{
        const top = document.getElementById("alertWrapper").offsetTop;
        window.scrollTo(0, top);
      });
      
    })
  
  }

  render(){
    return(
      <div className="page-wrapper form-page proof-page">
          <section className="form-section">
              <div className="subsection">
                  <h2>Submit Proof</h2>
                  <p>Proof can be a billing statement, a letter of verification, or a screenshot indicating you made a lifestyle change that benefits you, your community, or the planet.</p>
              </div>
              <form id="redeemForm" onSubmit={this.handleSubmit.bind(this)}>
                <input ref={(ref) => { this.fileName = ref; }} value="myfilename" type="hidden" />
                  <div className="input_container">
                    <label id="codeLabel">
                        <strong>Proof:</strong>
                        <input id="fileInput" name="file" type="file" ref={(ref) => { this.uploadInput = ref; }} required />
                    </label>
                  </div>
                  <div className="input_container">
                    <label id="messageLabel">
                        <strong>Message (optional):</strong>
                        <textarea value={this.state.message} name="message"  onChange={this.handleChange.bind(this)} placeholder="Anything else we should know?"></textarea>
                    </label>
                  </div>
                  <div className="input_container">
                      <label>
                        <input id="confirmCheck" name="confirmed" type="checkbox" checked={this.state.confirmed}  onChange={this.handleCheckboxToggle.bind(this)} required />
                        <strong>  I confirm the information in the submitted document is accurate and reflects my best intention for myself, the community, and the planet.</strong>
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

Proof.propTypes = {
  alerts : PropTypes.arrayOf(PropTypes.shape({ type : PropTypes.string.isRequired, message : PropTypes.string.isRequired })).isRequired,
  modifyAppState : PropTypes.func.isRequired,
}