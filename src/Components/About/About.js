// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// ASSETS
import Watermark from '~/assets/images/watermark.png';
import './about.scss';

// COMPONENT
const About = () => (
    <div className="page-wrapper about-page">
        <section className="title-section">
            <div className="subsection">
                <img src={Watermark} />
            </div>
            <div className="subsection">
                <h1>ECO ALLIES</h1>
                <p>A crypto collectable game to save our global envirionment</p>
            </div>
            {/* Uncomment after db fix */}
            {/* <div className="subsection">
                <Link to={`${APP_ROOT}register`}>
                    <button className="btn btn-primary">Get Started</button>
                </Link>
            </div> */}
            
        </section>
        <section className="collectable-section">
            <div className="subsection">
                <h2>Eco Ally</h2>
                <h3>A Defender of Gaia</h3>
            </div>
            <div className="subsection">
                <p>An Eco Ally is a unique collectable that cannot be replicated, taken away, or destroyed. They fight for our real life environment through actions you take, such as using a reusable grocery bag. It’s through this collective effort that we will help out Eco Allies defend our home, Gaea.</p>
            </div>
        </section>
        <section className="about-section">
            <div className="subsection">
                <h2>Collect Unique Heroes</h2>
                <h3>Help the Fight for our Environment</h3>
            </div>
            <div className="subsection">
                <p>Eco Allies is built on blockchain technology—the same breakthrough that makes things like Bitcoin and Ethereum possible. Bitcoin and ether are cryptocurrencies but Eco Allies are cryptocollectibles. You can trade your allies like it was a traditional collectible, or hold onto it as a badge of honor for helping Gaea. Your Ally is secure in the knowledge that blockchain will track ownership securely.</p>
                <p><strong>But I don't know what all that stuff is...</strong><br />That's ok! We have a basic account option that sidesteps use of the blockchain if you'd like. You will not have full account functionality with this option though.</p>
            </div>
        </section>
        <section className="creator-section">
            <div className="subsection">
                <h2>About the Author</h2>
                <h3>Bryson Michael Kruk</h3>
            </div>
            <div className="subsection">
                <p>Bryson Michael Kruk is the developer, designer, and creative force behind Eco Allies. As a child, he was very drawn to games, heroes, fantasy and creating fun activities with his creative faucet. With a graphic design degree, a programming career and a tireless desire to witness a better world, Eco Allies was born!</p>
            </div>
        </section>
    </div>
);

export default About;