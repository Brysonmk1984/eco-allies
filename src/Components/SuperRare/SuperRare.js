// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// ASSETS
import './superRare.scss';
import ChronoGuy from  '~/assets/images/misc/card-chrono-guy.png';
import CardBack from  '~/assets/images/misc/card-back-tt.png';

// COMPONENT
const SuperRare = () => (
    <div className="page-wrapper superrare-page">
        <section className="title-section collectable-section">
          <div className="subsection">
              <h2>Super-Rare EcoAllies</h2>
              <p>Defend Gaia - Collect Unique Artwork</p>
          </div>
          <div className="subsection">
          <div className="card-container">
                <img className="card" src={ChronoGuy} />
                <strong>Released on: 4/22/19</strong>
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
              <div className="card-container">
                <img className="card card-back" src={CardBack} />
              </div>
          </div>
        </section>
        <section className="description-section">
          <div className="subsection">
            <h3>Super-Rare - Collectable Digital Artwork</h3>
            <p>Super-Rare makes it easy to create, sell, and collect rare digital art. Using blockchain technology, their smart contract platform allows artists to release limited-edition digital artwork, making the art rare, verified and collectible. Learn more about SuperRare <a href="https://superrare.co/">here.</a></p>
          </div>
          <div className="subsection">
            <h3>EcoAllies on SuperRare</h3>
            <p>
              There will be an initial wave of the ten original allies with an exclusive <strong>Tectonic Ten</strong> badge for sale, one new Ally every week. After the initial ten pieces, a randomly generated new ally token will be added once per week. All these tokens will be uniquely verifyable on SuperRare, but also on our own smart contract. You can see for yourself by visiting <a href="https://etherscan.io/address/0x7148F604150db2110106A86Ee120DB9D8C09EAD0" target="_blank">etherscan.io</a>.
            </p>
          </div>
          <div className="subsection">
              <a href="https://superrare.co/" target="_blank">
                <button className="btn btn-primary">SuperRare Collection</button>
              </a>
          </div>
        </section>
    </div>
);

export default SuperRare;