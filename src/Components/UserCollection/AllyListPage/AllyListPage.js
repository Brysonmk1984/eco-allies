// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import AllyTile from '../AllyTile/AllyTile';
import AddModal from '../AddModal';
// ASSETS
import './allyListPage.scss';


// COMPONENT
export default class UserCollection extends React.Component{

    // Map all ally data belonging to this owner to individual ally components
    buildAllyList(){
        return this.props.allies.map((ally, i) => {
            return (
                <AllyTile key={i} dna={ally.dna} id={ally.id} />
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
                <AddModal buildAlly={this.props.buildAlly.bind(this)} />
            </div>
        );
    }
};

// PROP-TYPES
UserCollection.propTypes = {
    loggedIn : PropTypes.bool.isRequired,
    allies : PropTypes.array.isRequired,
    buildAlly : PropTypes.func.isRequired
};