// REACT
import React from 'react';
// ASSETS
import './footer.scss';
import beltBuckle from '~/assets/images/layout/belt_buckle.png';
import groupShot from '~/assets/images/layout/black_group_shot.png';

// COMPONENT
const Footer = () => (
    <footer className="center-align">
        <div className="belt">
            <img className="belt_buckle" src={beltBuckle} />
        </div>
        <div className="footer_content">
            <strong>&copy; Bryson Kruk Design & Development</strong><br />
            <a href="htttp://brysonkruk.com" >www.brysonkruk.com</a>
        </div>
        <img className="group_shot" src={groupShot} />
    </footer>
);

export default Footer;