// REACT
import React from 'react';
// LIBRARIES
import JwModal from 'jw-react-modal';
// COMPONENTS
import GalleryAllyTile from '../GalleryAllyTile';
// COMMON
import history from '~/common/history';
import allyList from '~/common/allyList.json';
import {shuffleArray} from '~/common/helperFunctions';
import * as AllyImages from '~/common/includedImages';
import { lowercaseUnderscore, lowercaseDash } from '~/common/helperFunctions';
// ASSETS
import './galleryListPage.scss';

// COMPONENT
export default class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeAlly : null
        }
    }
    buildAllyList(){
        const randomizedAllies = shuffleArray(allyList);

        return randomizedAllies.map((ally, i) => {
            if(ally.active){
                return (
                    <GalleryAllyTile key={i} ally={ally} openModal={this.openModal.bind(this)}  />
                );
            }
        });
    }

    openModal(activeAlly){
        
        this.setState(() =>({activeAlly}), ()=>{
            document.getElementById("openModalButton").click();
        });
    }

    closeModal(){
        document.getElementById("closeModalButton").click();
    }

    navigateToAllyPage(){
        history.push({
            pathname: `${APP_ROOT}gallery/${lowercaseDash(this.state.activeAlly.character)}`,
            state: {
                allyCharacter : this.state.activeAlly.character
            }
        });
    }



    renderAllyModal(){
        if(this.state.activeAlly){
            return <JwModal id="jw-modal-1">
                <div id="featureModalAlly" onClick={this.closeModal.bind(this)}>
                    <img src={ AllyImages[lowercaseUnderscore(this.state.activeAlly.character)] } onClick={this.navigateToAllyPage.bind(this)}  />
                    <div id="allyHighlight"></div>
                </div>
                <div id="featureModalContent" className="timber_terror">
                    <h2>{this.state.activeAlly.character}</h2>
                    <h3>{ this.state.activeAlly.description }</h3>
                    <h4>Abilities</h4>
                    <ul>
                        <li>{ this.state.activeAlly.ultimate }</li>
                        { this.state.activeAlly.skills.map((s, i) =>{
                            return <li key={i}>{ s }</li>
                        }) }
                    </ul>
                    <h4>Natural Alignment</h4>
                    <p>
                        { this.state.activeAlly.history }
                    </p>
                </div>
                <button id="closeModalButton" onClick={JwModal.close('jw-modal-1')}>Close</button>
                <button id="openModalButton" onClick={JwModal.open('jw-modal-1')}>Open JW Modal 1</button>
            </JwModal>
        }
        return false;
    }

    render(){
        return(
            <div className="page-wrapper gallery-list-page">
                
                <section className="ally-section">
                    <div className="subsection">
                        {this.buildAllyList()}
                    </div>
                </section>
                
                { this.renderAllyModal() }
            </div>
        );
    }
   
};