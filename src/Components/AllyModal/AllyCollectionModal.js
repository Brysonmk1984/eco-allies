import React from 'react';
// COMMON
import * as AllyImages from '~/common/includedImages';
import * as AllyBackgrounds from '~/common/includedBackgrounds';
import { lowercaseUnderscore } from '~/common/helperFunctions';
// LIBRARIES
import PropTypes from 'prop-types';
// ASSETS
import fist from '~/assets/images/fist.png';

const AllyCollectionModal = function(props){
  const a = props.activeAlly;
  return (
    <div id="allyModal" className="ally-modal">
      <div className="ally-modal-body">
        <div id="featureModalAlly" onClick={props.closeModal}>
          <img src={ AllyImages[lowercaseUnderscore(a.basics.character) + '_ns'] }   />
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
                    <h4 style={ {color : a.basics.colors[3],  borderBottom: `solid 2px ${a.basics.colors[3]}`  } }>Power</h4>
                    <img className="fist fist-reversed" src={fist} /> 
                    <span className="power" style={ {color : a.basics.colors[1]} }>{a.power}</span>
                </div>
                <p id="history" style={ {color : a.basics.colors[4] } }>
                    { a.history }
                </p>
                <img id="allyKO" src={ AllyImages[`${lowercaseUnderscore(a.basics.character)}_ko`] } />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AllyCollectionModal;

AllyCollectionModal.propTypes = {
  activeAlly : PropTypes.shape({
    alignment: PropTypes.string.isRequired,
    backgroundClasses: PropTypes.string.isRequired,
    basics: PropTypes.object.isRequired,
    color: PropTypes.string,
    dna: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    openModal: PropTypes.func,
    power: PropTypes.number.isRequired,
    sign: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    ultimate: PropTypes.string,
  }).isRequired,
  closeModal : PropTypes.func.isRequired,
  //navigateToAllyPage : PropTypes.func.isRequired
}