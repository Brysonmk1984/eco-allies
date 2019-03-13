// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// ASSETS
import Watermark from '~/assets/images/watermark.png';
import './faq.scss';

// COMPONENT
const FAQ = () => (
    <div className="page-wrapper faq-page">
        <section className="title-section">
            <div className="subsection">
                <img src={Watermark} />
            </div>
            <div className="subsection title-subsection">
                <h1>FAQ</h1>
            </div>
        </section>
        <section className="qa-section hardware-section">
            <div className="subsection">
                <h2>What Do I need to Play?</h2>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">What's the difference between a Full Account and a Simple Account?</strong>
              <p className="answer">Full Accounts use the Ethereum blockchain for saving your allies; you must have MetaMask installed to have a full account. Simple Accounts don't use the blockchain, and your heroes are saved to a database on our servers. This account mode does not have full functionality.</p>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">What kind of device do I need to play?</strong>
              <p className="answer"><strong>Full account:</strong> any device that can access the metamask extension. So this can be a Mac or PC that has Chrome, Firefox, Brave, or Mist installed. We are working on making Eco Allies mobile friendly. Currently, you can view your collection on mobile, but cannot retrieve or trade allies.</p>
              <p className="answer"><strong>Simple account:</strong> any device!</p>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">What is Metamask?</strong>
              <p className="answer">Metamask is a browser extention that allows you to access the Ethereum blockchain.</p>
            </div>
        </section>
        <section className="qa-section earning-section">
            <div className="subsection">
                <h2>Collecting Heroes</h2>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">How do I earn Heroes?</strong>
              <p className="answer">You must send in proof of a positive act that benefits the community from <Link to={`${APP_ROOT}proof`}>this page.</Link> Not sure if your deed qualifies? <Link to={`${APP_ROOT}contact`}>Ask us!</Link></p>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">Can I buy or sell Heroes?</strong>
              <p className="answer">Not at this time, but we are considering ways to do this ethically.</p>
            </div>
        </section>
        <section className="qa-section comming-soon-section">
            <div className="subsection">
                <h2>Comming Soon</h2>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">Titanium Allies! What is a Titanium Ally?</strong>
              <p className="answer">You must donate money to a good cause and send in proof. Titanium Allies have unique, custom drawn artwork based on the charity you donated to.</p>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">Battle Mode! What is Battle Mode?</strong>
              <p className="answer">You can opt in to randomly have your allies battle other allies on the network.</p>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">Level up your Allies</strong>
              <p className="answer">Currently considering ways to integrate 3rd party APIs that benefit the community as a means to automatically upgrade your Allies!</p>
            </div>
            <div className="subsection qa-subsection">
              <strong className="question">Trading, Buying and Selling</strong>
              <p className="answer">Currently under consideration...</p>
            </div>
        </section>
    </div>
);

export default FAQ;