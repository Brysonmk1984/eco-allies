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
import * as AllyBackgrounds from '~/common/includedBackgrounds';
import { lowercaseUnderscore } from '~/common/helperFunctions';
// ASSETS
import './galleryListPage.scss';

// COMPONENT
export default class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeAlly : null,
            loading : true
        }
        const listCopy = JSON.parse(JSON.stringify(allyList));
        
        this.allyList = shuffleArray(listCopy);
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
        const a = this.state.activeAlly;
        if(a){
            return <JwModal id="jw-modal-1">
                <div id="featureModalAlly" onClick={this.closeModal.bind(this)}>
                    <img src={ AllyImages[lowercaseUnderscore(a.character)] } onClick={this.navigateToAllyPage.bind(this)}  />
                    <div id="allyHighlight"></div>
                </div>
                <div id="featureModalContent" style={ {backgroundImage: `url(${AllyBackgrounds[lowercaseUnderscore(a.character)]})`} }>
                    <div id="contentTitle">
                        <h2 style={ {backgroundColor : a.colors[0], color : a.colors[1] } }>{a.character}</h2>
                        <h3 style={ {backgroundColor : a.colors[2], color : a.colors[3] } }>{ a.description }</h3>
                    </div>
                    <div id="contentBody">
                        <div id="attributes">
                            <h4 style={ {color : a.colors[3], borderBottom: `solid 2px ${a.colors[3]}`  } }>Abilities</h4>
                            <ul id="abilities">
                                <li id="ultimateAbility"  style={ {color : a.colors[4], fontWeight : 'bold'} }><span>{ a.ultimate }</span></li>
                                { a.skills.map((s, i) =>{
                                    return <li className="regular_ability" key={i}  style={ {color : a.colors[1] } }><span style={{paddingLeft : '4px'}}>{ s }</span></li>
                                }) }
                            </ul>
                            <h4 style={ {color : a.colors[3],  borderBottom: `solid 2px ${a.colors[3]}`  } }>Natural Alignment</h4>
                            <ul id="naturalAlignment" >
                                <li style={ {color : a.colors[1]} }>{ a.alignment }</li>
                            </ul>
                        </div>
                        <p id="history" style={ {color : a.colors[4] } }>
                            { a.history }
                        </p>
                        <img id="allyKO" src={ AllyImages[`${lowercaseUnderscore(a.character)}_ko`] } />
                    </div>
                    
                </div>
                <button id="closeModalButton" className="hide" onClick={JwModal.close('jw-modal-1')}>Close</button>
                <button id="openModalButton" className="hide" onClick={JwModal.open('jw-modal-1')}>Open JW Modal 1</button>
            </JwModal>
        }
        return false;
    }

    componentDidMount(){
        setTimeout(()=>{this.setState({loading:false})},250);
    }


    render(){
        return(
            <div className="page-wrapper gallery-list-page">
                
                {
                    this.state.loading ?
                    <section className="ally-section">
                    <div className={`subsection subsection-loading`}>
                        <strong>Loading...</strong>
                    </div>
                </section>
                :
                <section className="ally-section">
                    <div className={`subsection`}>
                        {
                            
                            this.allyList.map((ally, i) => {
                                if(ally.active){
                                    return (
                                        <GalleryAllyTile key={i} ally={ally} openModal={this.openModal.bind(this)}  />
                                    );
                                }
                            })
                         
                        }
                    </div>
                </section>
                }
                
                { this.renderAllyModal() }
            </div>
        );
    }
   
};