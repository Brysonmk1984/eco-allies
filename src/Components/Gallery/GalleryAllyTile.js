// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMMON
import * as AllyImages from '~/common/includedImages';
import { lowercaseUnderscore } from '~/common/helperFunctions';
   


// COMPONENT
const GalleryAllyTile = function(props){

    return(
        <aside className="ally">
            <div className="ally-image" onClick={props.openModal.bind(this, props.ally)}>
                <img src={ AllyImages[lowercaseUnderscore(props.ally.character)] }  onClick={props.openModal.bind(this, props)} />
            </div>
        </aside>
    );
};

export default GalleryAllyTile;

// PROP-TYPES
GalleryAllyTile.propTypes = {
    ally : PropTypes.shape({
        active : PropTypes.bool.isRequired,
        character : PropTypes.string.isRequired,
        skills : PropTypes.array.isRequired,
        image : PropTypes.string.isRequired,
        history : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired
    }),
    openModal : PropTypes.func.isRequired
};