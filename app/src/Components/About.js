import React from 'react';
import { Link } from 'react-router-dom';
import Watermark from '../assets/images/watermark.png';

const About = () => (
    <div>
        <div class="title-section section">
            <div class="subsection">
                <img src={Watermark} />
            </div>
            <div class="subsection">
                <h1>ECO ALLIES</h1>
                <p>A crypto collectable game to save our global envirionment</p>
            </div>
            <div class="subsection">
                <Link to="/gettingsStarted">
                    <button class="btn btn-primary">Get Started</button>
                </Link>
            </div>
            
        </div>
        <div class="ally-section section">
            <div class="subsection">
                <h2>Eco Ally</h2>
                <h3>A Defender of Gaea</h3>
            </div>
            <div class="subsection">
                <p>An Eco Ally is a unique collectable that cannot be replicated, taken away, or destroyed. They fight for our real life environment through actions you take, such as using a reusable grocery bag. It’s through this collective effort that we will help out Eco Allies defend our home, Gaea.</p>
            </div>
        </div>
        <div class="about-section section">
            <div class="subsection">
                <h2>Collect Unique Heroes</h2>
                <h3>Help the Fight for our Environment</h3>
            </div>
            <div class="subsection">
                <p>Eco Allies is built on blockchain technology—the same breakthrough that makes things like Bitcoin and Ethereum possible. Bitcoin and ether are cryptocurrencies but Eco Allies are cryptocollectibles. You can trade your CryptoKitty like it was a traditional collectible, or hold onto it as a badge of honor for helping Gaea. Your Ally is secure in the knowledge that blockchain will track ownership securely.</p>
            </div>
        </div>
    </div>
);

export default About;