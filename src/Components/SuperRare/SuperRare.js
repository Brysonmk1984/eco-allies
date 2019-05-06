// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// ASSETS
import './superRare.scss';
import ChronoGuy from  '~/assets/images/misc/card-chrono-guy.png';
import CompostCreature from  '~/assets/images/misc/card-compost-creature.png';
import FiltronFive from  '~/assets/images/misc/card-filtron-five.png';
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
                <a href="https://superrare.co/artwork/chrono-guy-(tectonic-ten)---4-22-19-2936" target="_blank">
                  <img className="card" src={ChronoGuy} />
                </a>
                <div className="card-details">
                  <strong>Released 4/22/19</strong>
                  <a href="https://medium.com/@brysonmk1984/chrono-guy-eco-allies-artist-commentary-89c03cdc1042" target="_blank">Artist Commentary</a>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/compost-creature-(tectonic-ten)-4-29-19-3016" target="_blank">
                  <img className="card" src={CompostCreature} />
                </a>
                <div className="card-details">
                  <strong>Released 4/29/19</strong>
                  <a href="https://www.youtube.com/watch?v=H4A7yb-xk_E" target="_blank">Cobi's Card Review</a>
                  <a href="https://medium.com/@brysonmk1984/compost-creature-eco-allies-artist-commentary-4912fbc188c" target="_blank">Artist Commentary</a>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/filtron-five-(tectonic-ten)-5-6-19-3089" target="_blank">
                  <img className="card" src={FiltronFive} />
                </a>
                <div className="card-details">
                  <strong>Released 5/6/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a><img className="card card-back" src={CardBack} /></a>
                <div className="card-details">
                  <strong>Coming 5/13/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a><img className="card card-back" src={CardBack} /></a>
                <div className="card-details">
                  <strong>Coming 5/20/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a><img className="card card-back" src={CardBack} /></a>
                <div className="card-details">
                  <strong>Coming 5/27/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a><img className="card card-back" src={CardBack} /></a>
                <div className="card-details">
                  <strong>Coming 6/3/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a><img className="card card-back" src={CardBack} /></a>
                <div className="card-details">
                  <strong>Coming 6/10/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a><img className="card card-back" src={CardBack} /></a>
                <div className="card-details">
                  <strong>Coming 6/17/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a><img className="card card-back" src={CardBack} /></a>
                <div className="card-details">
                  <strong>Coming 6/24/19</strong>
                </div>
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
              One third of proceeds will go to charities working on solving global climate issues. There will be an initial wave of the ten original allies with an exclusive <strong>Tectonic Ten</strong> badge for sale, one new Ally every week. After the initial ten pieces, a randomly generated new ally token will be added once per week. The supply will be restricted to these allies, with the exception of small limited released that may happen a few times per year. All these tokens will be uniquely verifyable on SuperRare, but also on our own smart contract. You can see for yourself by visiting <a href="https://etherscan.io/address/0x7148F604150db2110106A86Ee120DB9D8C09EAD0" target="_blank">etherscan.io</a>.
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