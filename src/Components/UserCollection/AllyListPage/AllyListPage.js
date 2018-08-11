import React from 'react';
import AllyTile from '../AllyTile';

import AddModal from '../AddModal';
import './allyListPage.scss';



class UserCollection extends React.Component{
    constructor(props){
        super(props);
        this.buildAlly = this.props.buildAlly.bind(this);
        this.transferAlly = this.props.transferAlly.bind(this);
    }
    buildAllyList(){
        return this.props.allies.map((ally, i) => {
            return (
                <AllyTile key={i} dna={ally.dna} id={ally.id} sign={ally.sign} />
            );
        });
    }

    


    

    render(){
        return(
            <div className="page-wrapper ally-list-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>Eco Allies</h1>
                        <p>Defenders of Gaia</p>
                    </div>
                </section>
                <section className="ally-section">
                    <h2>Your Team</h2>
                    <div className="subsection">
                        {this.buildAllyList()}
                    </div>
                </section>
                <section className="bottom-section">
                </section>

                <AddModal buildAlly={this.buildAlly.bind(this)} />
            </div>
        );
    }
   
};

export default UserCollection;