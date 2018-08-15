// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMMON
import * as AllyImages from '~/common/includedImages';
import { lowercaseUnderscore } from '~/common/helperFunctions';

// COMPONENT
const Ally = (props) => {
    return(
        <aside className="ally">
            <div className="ally-title">
                <h3>{props.ally.character}</h3>
                <h4>{ props.ally.description }</h4>
            </div>
            <div className="ally-image">
                <img src={ AllyImages[lowercaseUnderscore(props.ally.character)] } />
            </div>
            
            <div className="ally-skills">
                 <ul>
                    { props.ally.skills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                </ul>
            </div>
            <div className="ally-history">
                <p>
                    { props.ally.history }
                </p>
            </div>
            
        </aside>
    );
}

// PROP-TYPES
Ally.propTypes = {
    ally : PropTypes.shape({
        active : PropTypes.bool.isRequired,
        character : PropTypes.string.isRequired,
        skills : PropTypes.array.isRequired,
        image : PropTypes.string.isRequired,
        history : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired
    })
};

export default Ally;