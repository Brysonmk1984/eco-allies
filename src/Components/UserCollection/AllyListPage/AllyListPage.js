// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
import JwModal from 'jw-react-modal';
// COMPONENTS
import AllyTile from '../AllyTile/AllyTile';
import AddModal from '../AddModal';
// COMMON
import * as AllyImages from '~/common/includedImages';
import * as AllyBackgrounds from '~/common/includedBackgrounds';
import { lowercaseUnderscore } from '~/common/helperFunctions';
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
            return (
                <AllyTile key={i} dna={ally.dna} id={ally.id} openModal={this.openModal.bind(this)}  />
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
                    <img src={ AllyImages[lowercaseUnderscore(a.allyName)] } onClick={this.navigateToAllyPage.bind(this)}  />
                    <div id="allyHighlight"></div>
                </div>
                <div id="featureModalContent" style={ {backgroundImage: `url(${AllyBackgrounds[lowercaseUnderscore(a.allyName)]})`} }>
                    <div id="contentTitle">
                        <h2 style={ {backgroundColor : a.allyColors[0], color : a.allyColors[1] } }>{a.allyName}</h2>
                        <h3 style={ {backgroundColor : a.allyColors[2], color : a.allyColors[3] } }>{ a.allyDescription }</h3>
                    </div>
                    <div id="contentBody">
                        <div id="attributes">
                            <h4 style={ {color : a.allyColors[3], borderBottom: `solid 2px ${a.allyColors[3]}`  } }>Abilities</h4>
                            <ul id="abilities">
                                { this.state.allyUltimate ? <li id="ultimateAbility"  style={ {color : a.allyColors[4], fontWeight : 'bold'} }><span>{ a.allyUltimate }</span></li> : '' }
                                { a.allySkills.map((s, i) =>{
                                    return <li className="regular_ability" key={i}  style={ {color : a.allyColors[1] } }><span style={{paddingLeft : '4px'}}>{ s }</span></li>
                                }) }
                            </ul>
                            <h4 style={ {color : a.allyColors[3],  borderBottom: `solid 2px ${a.allyColors[3]}`  } }>Heroic Alignment</h4>
                            <ul id="naturalAlignment" >
                                <li style={ {color : a.allyColors[1]} }>{ a.allyAlignment }</li>
                            </ul>
                        </div>
                        <p id="history" style={ {color : a.allyColors[4] } }>
                            { a.allyHistory }
                        </p>
                        <img id="allyKO" src={ AllyImages[`${lowercaseUnderscore(a.allyName)}_ko`] } />
                    </div>
                    
                </div>
                <button id="closeCollectionModal" className="hide" onClick={JwModal.close('jw-modal-2')}>Close</button>
                <button id="openCollectionModal" className="hide" onClick={JwModal.open('jw-modal-2')}>Open JW Modal 2</button>
            </JwModal>
        }
        return false;
    }

    render(){
        return(
            <div className="page-wrapper ally-list-page">
                <section className="ally-section">
                    <h2>Your Collection</h2>
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
    loggedIn : PropTypes.bool.isRequired,
    allies : PropTypes.array.isRequired,
    buildAlly : PropTypes.func.isRequired
};