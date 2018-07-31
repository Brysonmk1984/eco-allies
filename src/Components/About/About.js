import React from 'react';
import { Link } from 'react-router-dom';
import Watermark from '../../assets/images/watermark.png';
import './about.scss';

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
            <div className="subsection">
                <Link to="/register">
                    <button className="btn btn-primary">Get Started</button>
                </Link>
            </div>
            
        </section>
        <section className="ally-section">
            <div className="subsection">
                <h2>Eco Ally</h2>
                <h3>A Defender of Gaea</h3>
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
                <p>Eco Allies is built on blockchain technology—the same breakthrough that makes things like Bitcoin and Ethereum possible. Bitcoin and ether are cryptocurrencies but Eco Allies are cryptocollectibles. You can trade your CryptoKitty like it was a traditional collectible, or hold onto it as a badge of honor for helping Gaea. Your Ally is secure in the knowledge that blockchain will track ownership securely.</p>
            </div>
        </section>
    </div>
);

export default About;