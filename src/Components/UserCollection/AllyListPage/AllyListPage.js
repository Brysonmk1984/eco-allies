// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import AllyTile from '../AllyTile/AllyTile';
import AddModal from '../AddModal';
import AllyModal from '~/Components/AllyModal/AllyCollectionModal';
// COMMON
import { decodeAlly } from '~/common/crackDna';
import * as AllyImages from '~/common/includedImages';
import * as AllyBackgrounds from '~/common/includedBackgrounds';
import { lowercaseUnderscore, lowercaseDash } from '~/common/helperFunctions';
import history from '~/common/history';
// ASSETS
import './allyListPage.scss';
import fist from '~/assets/images/fist.png';


// COMPONENT
export default class UserCollection extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activeAlly : null,
            loading : false
        }
    }

    openModal(activeAlly){
        document.body.classList.add('ally-modal-open');
        this.setState(() =>({ activeAlly }));
    }

    closeModal(){
        document.body.classList.remove('ally-modal-open');
        this.setState(() =>({ activeAlly : null }));
    }

    // Map all ally data belonging to this owner to individual ally components
    buildAllyList(){
        return this.props.allies.map((ally, i) => {
            const decodedAlly = decodeAlly(ally.dna);
            const backgroundClasses = decodedAlly.color ? `bg bg-${lowercaseDash(decodedAlly.color)}` : '';
            return (
                <AllyTile {...decodedAlly}  key={i} dna={ally.dna} id={ally.id} openModal={this.openModal.bind(this)} backgroundClasses={backgroundClasses}  />
            );
        });
    }

    navigateToAllyPage(){

        history.push({
            pathname: `${APP_ROOT}user-collection/${lowercaseDash(this.state.activeAlly.basics.character)}`,
            state: {
                allyCharacter : this.state.activeAlly.character
            }
        });
    }

    renderAllyModal(){
        if(this.state.activeAlly){
            return <AllyModal activeAlly={this.state.activeAlly} closeModal={this.closeModal.bind(this)} navigateToAllyPage={this.navigateToAllyPage.bind(this)} />
        }
        return null;
    }

    render(){
        return(
            <div className="page-wrapper ally-list-page">
                <section className="ally-section">
                    <h2>{this.props.username ? this.props.username + "'s Collection" : "Your Collection"}</h2>
                    <div className="subsection">
                        {this.buildAllyList()}
                    </div>
                </section>
                <AddModal buildAlly={this.props.buildAlly.bind(this)} />
                { this.renderAllyModal() }
            </div>
        );
    }
};

// PROP-TYPES
UserCollection.propTypes = {
    buildAlly : PropTypes.func.isRequired
};
