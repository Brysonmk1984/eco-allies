import React from 'react';
import Ally from '../Ally';
import './userCollection.scss';

class UserCollection extends React.Component{
    constructor(props){
        super(props);
        this.buildAlly = this.props.buildAlly.bind(this);
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
                        <p>Defenders of Gaia <button data-test="123" onClick={this.buildAlly}>Build Ally</button></p>
                        
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

export default UserCollection;