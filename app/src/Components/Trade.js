import React from 'react';
import '../assets/scss/trade.scss';
import Fred from '../assets/images/fred.png';
import Dave from '../assets/images/sherrif.png';
import Xin from '../assets/images/ninja.png';

const Trade = () => (
    <div class="page-wrapper trade-page">
        <section className="title-section">
            <div className="subsection">
                <h1>ECO ALLIES</h1>
                <p>Meet the Team</p>
            </div>
        </section>
        <section className="ally-section">
            <div className="subsection">
                <aside className="ally">
                    <div className="ally-title">
                        <h2>Fred Dezzle</h2>
                        <h3>Zombie Farmer</h3>
                    </div>
                    <div className="ally-image">
                        <img src={ Fred } />
                    </div>
                    <div className="ally-skills">
                        <div>
                            <span>Horticulture</span>
                            <span>Reviving Soil</span>
                        </div>
                    </div>
                    <div className="ally-history">
                        <p>
                            Fred was out defending the farm when the evil dust storm hit and wiped away his house. He came back to life to avenge his loss.
                        </p>
                    </div>
                </aside>
                <aside className="ally">
                    <div className="ally-title">
                        <h2>Sherif Dave</h2>
                        <h3>Town Sherrif</h3>
                    </div>
                    <div className="ally-image">
                        <img src={ Dave } />
                    </div>
                    <div className="ally-skills">
                        <div>
                            <span>Jail polluters</span>
                            <span>Eco-crime Ticketing</span>
                        </div>
                    </div>
                    <div className="ally-history">
                        <p>
                            Sherrif Dave was out defending the farm when the evil dust storm hit and wiped away his house. He came back to life to avenge his loss.
                        </p>
                    </div>
                </aside>
                <aside className="ally">
                    <div className="ally-title">
                        <h2>Xin Pao</h2>
                        <h3>Empath Ninja</h3>
                    </div>
                    <div className="ally-image">
                        <img src={ Xin } />
                    </div>
                    <div className="ally-skills">
                        <div>
                            <span>Love shiruken</span>
                            <span>Cloaked Hugs</span>
                        </div>
                    </div>
                    <div className="ally-history">
                        <p>
                            Xin was out defending the farm when the evil dust storm hit and wiped away his house. He came back to life to avenge his loss.
                        </p>
                    </div>
                </aside>
                <aside className="ally">
                    <div className="ally-title">
                        <h2>Fred Dezzle</h2>
                        <h3>Zombie Farmer</h3>
                    </div>
                    <div className="ally-image">
                        <img src={ Fred } />
                    </div>
                    <div className="ally-skills">
                        <div>
                            <span>Horticulture</span>
                            <span>Reviving Soil</span>
                        </div>
                    </div>
                    <div className="ally-history">
                        <p>
                            Fred was out defending the farm when the evil dust storm hit and wiped away his house. He came back to life to avenge his loss.
                        </p>
                    </div>
                </aside>
                <aside className="ally">
                    <div className="ally-title">
                        <h2>Sherif Dave</h2>
                        <h3>Town Sherrif</h3>
                    </div>
                    <div className="ally-image">
                        <img src={ Dave } />
                    </div>
                    <div className="ally-skills">
                        <div>
                            <span>Jail polluters</span>
                            <span>Eco-crime Ticketing</span>
                        </div>
                    </div>
                    <div className="ally-history">
                        <p>
                            Sherrif Dave was out defending the farm when the evil dust storm hit and wiped away his house. He came back to life to avenge his loss.
                        </p>
                    </div>
                </aside>

                
            </div>
        </section>
        <section className="bottom-section">
        </section>
    </div>
);

export default Trade;