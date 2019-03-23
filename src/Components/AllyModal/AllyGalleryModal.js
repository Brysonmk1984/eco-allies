import React from 'react';
// COMMON
import * as AllyImages from '~/common/includedImages';
import * as AllyBackgrounds from '~/common/includedBackgrounds';
import { lowercaseUnderscore } from '~/common/helperFunctions';
// LIBRARIES
import PropTypes from 'prop-types';

const AllyGalleryModal = function(props){
  const a = props.activeAlly;
  return (
    <div id="allyModal" className="ally-modal">
      <div className="ally-modal-body">
      <div id="featureModalAlly" onClick={props.closeModal}>
            <img src={ AllyImages[lowercaseUnderscore(a.character)] }  />
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
     </div>
    </div>
  );
};

export default AllyGalleryModal;

AllyGalleryModal.propTypes = {
  activeAlly : PropTypes.shape({
    active: PropTypes.bool.isRequired,
    alignment: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    history: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    ultimate: PropTypes.string.isRequired
  }).isRequired,
  closeModal : PropTypes.func.isRequired,
  //navigateToAllyPage : PropTypes.func.isRequired
}