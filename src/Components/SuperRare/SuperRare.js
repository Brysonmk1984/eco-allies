// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// ASSETS
import './superRare.scss';
import ChronoGuy from  '~/assets/images/misc/card-chrono-guy.png';
import CompostCreature from  '~/assets/images/misc/card-compost-creature.png';
import FiltronFive from  '~/assets/images/misc/card-filtron-five.png';
import EmpathAurelia from  '~/assets/images/misc/card-empath-aurelia.png';
import BoulderBro from  '~/assets/images/misc/card-boulder-bro.png';
import NaturalNinja from  '~/assets/images/misc/card-natural-ninja.png';
import RePete from  '~/assets/images/misc/card-repete.png';
import TimberTerror from  '~/assets/images/misc/card-timber-terror.png';
import SolarCeleste from  '~/assets/images/misc/card-solar-celeste.png';
import WilhelmTheWild from  '~/assets/images/misc/card-wilhelm-the-wild.png';
import CardBack from  '~/assets/images/misc/card-back-tt.png';

// COMPONENT
const SuperRare = () => (
    <div className="page-wrapper superrare-page">
      <div className="paypal-button">
        {/* DONATE BUTTON */}
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="KTF2EBXTGM63U" />
          <input type="hidden" name="currency_code" value="USD" />
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </div>
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
                  <a href="https://youtu.be/Q1b5RG8FcYg" target="_blank">Cobi's Card Review</a>
                  <a href="https://medium.com/@brysonmk1984/for-every-ally-ill-be-releasing-a-commentary-on-my-artistic-choices-for-the-character-593fbb393153" target="_blank">Artist Commentary</a>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/empath-aurelia-(tectonic-ten)-5-13-19-3152" target="_blank">
                  <img className="card" src={EmpathAurelia} />
                </a>
                <div className="card-details">
                  <strong>Released 5/13/19</strong>
                  <a href="https://www.youtube.com/watch?v=FAobFYEZ9gw" target="_blank">Cobi's Card Review</a>
                  <a href="https://medium.com/@brysonmk1984/empath-aurelia-eco-allies-artist-commentary-3171e04277da" target="_blank">Artist Commentary</a>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/boulder-bro-(tectonic-ten)-5-20-19-3241" target="_blank">
                  <img className="card" src={BoulderBro} />
                </a>
                <div className="card-details">
                <strong>Released 5/20/19</strong>
                <a href="https://www.youtube.com/watch?v=uSP88IS67kU" target="_blank">Cobi's Card Review</a>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/natural-ninja-(tectonic-ten)-5-27-19-3344" target="_blank">
                  <img className="card" src={NaturalNinja} />
                </a>
                <div className="card-details">
                <strong>Released 5/27/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/repete-(tectonic-ten)-6-3-19-3440" target="_blank">
                  <img className="card" src={RePete} />
                </a>
                <div className="card-details">
                <strong>Released 6/03/19</strong>
                <a href="https://brysonkruk.com/misc-images/eco-allies/guest-art-repete.jpg" target="_blank">Guest Art - David Weaver</a>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/timber-terror-(tectonic-ten)-6-10-19-3521" target="_blank">
                  <img className="card" src={TimberTerror} />
                </a>
                <div className="card-details">
                <strong>Released 6/10/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/solar-celeste-(tectonic-ten)-6-17-19-3615" target="_blank">
                  <img className="card" src={SolarCeleste} />
                </a>
                <div className="card-details">
                  <strong>Released 6/17/19</strong>
                </div>
              </div>
              <div className="card-container">
                <a href="https://superrare.co/artwork/wilhelm-the-wild-(tectonic-ten)-6-24-19-3695" target="_blank">
                  <img className="card" src={WilhelmTheWild} />
                </a>
                <div className="card-details">
                  <strong>Released 6/24/19</strong>
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
            <a href="https://medium.com/@brysonmk1984/eco-allies-swoop-in-to-raise-money-for-social-impact-efforts-in-colorado-48aa37d08b2c" target="_blank"><strong>Press Release</strong></a>
            {/* <p>
              All proceeds for the limited edition, Tectonic Ten will go to charities working on solving social and climate issues in Colorado! The Tectonic Ten will have an exclusive <strong>Tectonic Ten</strong> badge, with one new Ally for sale every week. After the initial ten pieces, a randomly generated new ally token will be added once per week. The supply will be restricted to these allies, with the exception of small limited released that may happen a few times per year. All these tokens will be uniquely verifyable on SuperRare, but also on our own smart contract. You can see for yourself by visiting <a href="https://etherscan.io/address/0x7148F604150db2110106A86Ee120DB9D8C09EAD0" target="_blank">etherscan.io</a>.
            </p> */}
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