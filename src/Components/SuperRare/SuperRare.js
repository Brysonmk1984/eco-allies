// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// ASSETS
import './superRare.scss';

// COMPONENT
const SuperRare = () => (
    <div className="page-wrapper superrare-page">
        <section className="title-section">
          <div className="subsection">
              <h1>EcoAllies on SuperRare</h1>
              <p>Defend Gaia - Collect Unique Allies</p>
          </div>
          <div className="subsection">
            <p>SuperRare makes it easy to create, sell, and collect rare digital art. Using blockchain technology, their smart contract platform allows artists to release limited-edition digital artwork, making the art rare, verified and collectible. Learn more about SuperRare <a href="https://superrare.co/">here.</a></p>
          </div>
          <div className="subsection">
            <strong>Super-Super Rare EcoAllies</strong>
            <p>
              There will be an initial wave of the ten original allies with an exclusive <strong>Tectonic Ten</strong> badge for sale, one new Ally every week. After the initial ten pieces, a randomly generated new ally token will be added once per week. All these tokens will be uniquely verifyable on SuperRare, but also on our own smart contract. You can see for yourself by visiting <a href="https://www.rinkeby.etherscan.io/" target="_blank">rinkeby.etherscan.io</a>.
            </p>
          </div>
          <div className="subsection">
              <a href="https://superrare.co/" target="_blank">
                <button className="btn btn-primary">View Collection</button>
              </a>
          </div>
        </section>
        <section className="collectable-section">
            <div className="subsection">
                <h2>The Masterpieces</h2>
            </div>
            <div className="subsection">
                <p>Cards go here</p>
            </div>
        </section>
    </div>
);

export default SuperRare;