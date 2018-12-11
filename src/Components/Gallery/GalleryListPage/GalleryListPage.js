// REACT
import React from 'react';
// LIBRARIES
import JwModal from 'jw-react-modal';
// COMPONENTS
import GalleryAllyTile from '../GalleryAllyTile';
// COMMON
import allyList from '~/common/allyList.json';
import {shuffleArray} from '~/common/helperFunctions';
import * as AllyImages from '~/common/includedImages';
import { lowercaseUnderscore } from '~/common/helperFunctions';
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
                    <GalleryAllyTile key={i} ally={ally} toggleActiveAlly={this.toggleActiveAlly.bind(this)}  />
                );
            }
        });
    }

    toggleActiveAlly(activeAlly){
        console.log('AAA', activeAlly);
        
        this.setState(() =>({activeAlly}), ()=>{
            document.getElementById("openModalButton").click();
        });
    }

    renderAllyImage(){
        if(this.state.activeAlly){
            return <img src={ AllyImages[lowercaseUnderscore(this.state.activeAlly.character)] }  />
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
                
                <JwModal id="jw-modal-1">
                    <div id="featureModalAlly">
                        { this.renderAllyImage() }
                        <div id="allyHighlight"></div>
                    </div>
                    <div id="featureModalContent">
                        <h1>A JW Modal!</h1>
                        <p>
                            Add any html you like in here :)
                        </p>
                        <button onClick={JwModal.close('jw-modal-1')}>Close</button>
                    </div>
                    <button id="openModalButton" onClick={JwModal.open('jw-modal-1')}>Open JW Modal 1</button>
                </JwModal>
            </div>
        );
    }
   
};