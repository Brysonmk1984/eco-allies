// REACT
import React from 'react';
//LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// ASSETS
import './contact.scss';

// COMPONENT
const Contact = (props) => {
  return(
    <div className="page-wrapper contact-page form-page">
      <section className="form-section">
        <div className="subsection">
            <h2>Leave us a Message</h2>
            <p>Question? Feedback? Philisophical musing? We'd love to hear from you.</p>
        </div>
        <div className="subsection">
          <form id="emailForm" onSubmit={props.handleSubmit}>
            <div className="input_container">
              <label>
                  <strong>Your Email:</strong>
                  <input name="email" type="email" value={props.email} onChange={props.handleEmailChange} placeholder="Enter Email Address" minLength="4" maxLength="100" required />
              </label>
            </div>
            <div className="input_container">
              <label>
                <strong>Your Message:</strong>
                <textarea name="message" value={props.message} onChange={props.handleMessageChange} placeholder="Enter a brieff message here" minLength="4" maxLength="2000" required>
                </textarea>
              </label>
            </div>
            <div className="input_container submit_button_container">
                <Button type="submit" className="btn btn-primary btn-block">
                    Send Message
                </Button>
            </div>
          </form>
          <div id="directEmail">
            <strong>- OR -</strong>
            <p>Email us Directly:<br /> <a href="mailto:info@ecoalliesofgaia.com">info@ecoalliesofgaia.com</a></p>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Contact;

// PROP-TYPES
Contact.propTypes = {
  email : PropTypes.string.isRequired,
  handleEmailChange : PropTypes.func.isRequired,
  handleMessageChange : PropTypes.func.isRequired,
  handleSubmit : PropTypes.func.isRequired
};