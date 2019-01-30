// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
import JwModal from 'jw-react-modal';
// COMPONENTS
import AllyTile from '../AllyTile/AllyTile';
import AddModal from '../AddModal';
// COMMON
import { decodeAlly } from '~/common/crackDna';
import * as AllyImages from '~/common/includedImages';
import * as AllyBackgrounds from '~/common/includedBackgrounds';
import { lowercaseUnderscore, lowercaseDash } from '~/common/helperFunctions';
import history from '~/common/history';
// ASSETS
import './allyListPage.scss';


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
        this.setState(() =>({activeAlly}), ()=>{
            document.getElementById("openCollectionModal").click();
        });
    }

    closeModal(){
        document.getElementById("closeCollectionModal").click();
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
            pathname: `${APP_ROOT}user-collection/${lowercaseDash(this.state.activeAlly.character)}`,
            state: {
                allyCharacter : this.state.activeAlly.character
            }
        });
    }

    renderAllyModal(){
        const a = this.state.activeAlly;
        if(a){
            return <JwModal id="jw-modal-2">
                <div id="featureModalAlly" onClick={this.closeModal.bind(this)}>
                    <img src={ AllyImages[lowercaseUnderscore(a.basics.character)] } onClick={this.navigateToAllyPage.bind(this)}  />
                    <div id="allyHighlight"></div>
                </div>
                <div id="featureModalContent" style={ {backgroundImage: `url(${AllyBackgrounds[lowercaseUnderscore(a.basics.character)]})`} }>
                    <div id="contentTitle">
                        <h2 style={ {backgroundColor : a.basics.colors[0], color : a.basics.colors[1] } }>{a.basics.character}</h2>
                        <h3 style={ {backgroundColor : a.basics.colors[2], color : a.basics.colors[3] } }>{ a.basics.description }</h3>
                    </div>
                    <div id="contentBody">
                        <div id="attributes">
                            <h4 style={ {color : a.basics.colors[3], borderBottom: `solid 2px ${a.basics.colors[3]}`  } }>Abilities</h4>
                            <ul id="abilities">
                                { a.ultimate ? <li id="ultimateAbility"  style={ {color : a.basics.colors[4], fontWeight : 'bold'} }><span>{ a.ultimate }</span></li> : '' }
                                { a.skills.map((s, i) =>{
                                    return <li className="regular_ability" key={i}  style={ {color : a.basics.colors[1] } }><span style={{paddingLeft : '4px'}}>{ s }</span></li>
                                }) }
                            </ul>
                            <h4 style={ {color : a.basics.colors[3],  borderBottom: `solid 2px ${a.basics.colors[3]}`  } }>Heroic Alignment</h4>
                            <ul id="naturalAlignment" >
                                <li style={ {color : a.basics.colors[1]} }>{ a.alignment }</li>
                            </ul>
                        </div>
                        <p id="history" style={ {color : a.basics.colors[4] } }>
                            { a.history }
                        </p>
                        <img id="allyKO" src={ AllyImages[`${lowercaseUnderscore(a.basics.character)}_ko`] } />
                    </div>
                    
                </div>
                <button id="closeCollectionModal" className="hide" onClick={JwModal.close('jw-modal-2')}>Close</button>
                <button id="openCollectionModal" className="hide" onClick={JwModal.open('jw-modal-2')}>Open JW Modal 2</button>
            </JwModal>
        }
        return false;
    }

    render(){console.log(this.props);
        return(
            <div className="page-wrapper ally-list-page">
                <section className="ally-section">
                    <h2>{this.props.username} Collection</h2>
                    <div className="subsection">
                        {this.buildAllyList()}
                    </div>
                </section>
                <AddModal buildAlly={this.props.buildAlly.bind(this)} />
                {this.renderAllyModal()}
            </div>
        );
    }
};

// PROP-TYPES
UserCollection.propTypes = {
    buildAlly : PropTypes.func.isRequired
};