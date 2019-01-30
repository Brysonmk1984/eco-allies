// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// STYLES
import './proof.scss';


const Proof = function(props){
  let fileName;
  let uploadInput;

  function handleSubmit(e){
    e.preventDefault();
    props.handleSubmit({fileName, uploadInput});
  }

  return(
    <div className="page-wrapper form-page proof-page">
        <section className="form-section">
            <div className="subsection">
                <h2>Submit Proof</h2>
                <p>Proof can be a billing statement, a letter of verification, or a screenshot indicating you made a lifestyle change that benefits you, your community, or the planet.</p>
            </div>
            <form id="redeemForm" onSubmit={handleSubmit}>
              <input ref={(ref) => { fileName = ref; }} value="myfilename" type="hidden" />
                <div className="input_container">
                  <label id="codeLabel">
                      <strong>Proof:</strong>
                      <input id="fileInput" name="file" type="file" ref={(ref) => { uploadInput = ref; }} required />
                  </label>
                </div>
                <div className="input_container">
                  <label id="messageLabel">
                      <strong>Message (optional):</strong>
                      <textarea value={props.message} name="message"  onChange={props.handleChange} placeholder="Anything else we should know?"></textarea>
                  </label>
                </div>
                <div className="input_container">
                    <label>
                      <input id="confirmCheck" name="confirmed" type="checkbox" checked={props.confirmed}  onChange={props.handleCheckboxToggle} required />
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

export default Proof;

Proof.propTypes = {
  handleChange : PropTypes.func.isRequired,
  handleCheckboxToggle : PropTypes.func.isRequired,
  confirmed : PropTypes.bool.isRequired,
  message : PropTypes.string.isRequired,
}