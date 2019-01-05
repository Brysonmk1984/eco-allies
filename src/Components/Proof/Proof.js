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
      message : '',
      errors : [],
    };

  }

  // Handle change of form elements and update states
  handleChange(e){
    e.persist();
    const newState = {};
    //console.log('target',e.target, this.fileInput.current.files[0]);

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

    const formData = new FormData();
    formData.append('file', this.uploadInput.files[0]);
    formData.append('filename', this.fileName.value);
    formData.append('message', this.state.message);

    this.props.handleProof(formData)
    .then((data) =>{
      console.log('PROOF DATA', data);
    })
    

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


  render(){
    return(
      <div className="page-wrapper form-page proof-page">
          <section className="alert-section">
              {this.renderAlertSection()}
              {this.renderSuccessSection()}
          </section>
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

}