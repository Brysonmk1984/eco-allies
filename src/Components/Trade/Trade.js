import React from 'react';
import Ally from '../Ally';
import './trade.scss';

class Trade extends React.Component{
    buildAllyList(){
        return this.props.allies.map((ally, i) => {
            return (
                <Ally key={i} name={ally.name} dna={ally.dna} />
            );
        });
    }

    render(){
        return(
            <div className="page-wrapper trade-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>ECO ALLIES</h1>
                        <p>Meet the Team</p>
                    </div>
                </section>
                <section className="ally-section">
                    <div className="subsection">
                        {this.buildAllyList()}
                    </div>
                </section>
                <section className="bottom-section">
                </section>
            </div>
        );
    }
   
};

export default Trade;