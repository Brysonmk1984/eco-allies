// REACT
import React from 'react';
//LIBRARIES
import { Button } from '@material-ui/core';
// ASSETS
import './contact.scss';

// COMPONENT
const Contact = (props) => {
  return(
    <div className="page-wrapper contact-page form-page">
      <section className="title-section">
          <div className="subsection">
              <h1>Send Us An Email</h1>
              <p>Question? Feedback? Philisophical musing? We'd love to hear from you.</p>
          </div>
      </section>
      <section className="direct-section">
          <div className="subsection">
              <h2>Send us an Email Directly</h2>
              <h3>info AT ecoalliesofgaia.com</h3>
          </div>
          <div className="subsection">
              <p>Leave us a message and we will try to respond as soon as possible or send an email directly to meow@cryptokitties.co.</p>
          </div>
      </section>
      <section className="form-section">
        <div className="subsection">
            <h2>Leave us a Message</h2>
            <h3>Submit a brief question or comment below</h3>
        </div>
        <div className="subsection">
          <form id="emailForm" onSubmit={props.handleSubmit}>
              <div className="input_container">
                <label>
                    <strong>Your Email:</strong>
                    <input name="email" type="email" value={props.email} onChange={props.handleEmailChange} placeholder="Enter Email" minLength="4" maxLength="100" required />
                </label>
              </div>
              <div className="input_container">
                <label>
                  <strong>Your Message:</strong>
                  <textarea name="message" value={props.message} onChange={props.handleMessageChange} placeholder="Enter a brieff message below" minLength="4" maxLength="2000" required>
                  </textarea>
                </label>
              </div>
              <div className="input_container submit_button_container">
                  <Button type="submit" className="btn btn-primary btn-block">
                      Send Message
                  </Button>
              </div>
          </form>
        </div>
      </section>
    </div>
  )
};

export default Contact;