import React from 'react';
import Ally from '../Ally';
import './gallery.scss';

class Gallery extends React.Component{
    constructor(props){
        super(props);
    }
    buildAllyList(){
        return this.props.allies.map((ally, i) => {
            return (
                <Ally key={i} name={ally.name} dna={ally.dna} />
            );
        });
    }

    render(){console.log('THIS>P', this.props.allies);
        return(
            <div className="page-wrapper trade-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>ECO ALLIES</h1>
                        <p>Defenders of Gaia</p>
                        
                    </div>
                </section>
                <section className="ally-section">
                    <div className="subsection">
                        <aside className="ally">
                            <div className="ally-title">
                                <h2>{props.name}</h2>
                                <h3>{determineAlly(props.dna)}</h3>
                            </div>
                            <div className="ally-image">
                                <img src={ determineImage(props.dna) } />
                            </div>
                            <div className="ally-skills">
                                <ul>
                                    <li>skill 1</li>
                                    <li>skill 1</li>
                                    <li>skill 1</li>
                                    <li>skill 1</li>
                                    <li>skill 1</li>
                                </ul>
                            </div>
                            <div className="ally-history">
                                <p>
                                    Fred was out defending the farm when the evil dust storm hit and wiped away his house. He came back to life to avenge his loss.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>
                <section className="bottom-section">
                </section>
            </div>
        );
    }
   
};

export default Gallery;