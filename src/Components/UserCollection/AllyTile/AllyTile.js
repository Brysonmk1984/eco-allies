// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMMON
import { lowercaseDash } from '~/common/helperFunctions';
// ASSETS
import './allyTile.scss';

// COMPONENT
const AllyTile = function(props){

    const determineBackground = function(variant){
        if(variant !== null){
            return `bg bg-${lowercaseDash(variant)}`;
        }
        return ''; 
    }
    
    return(
        <aside className="ally">
            <div className={`ally-image`} onClick={props.openModal.bind(this, props )}>
                <img className={`${determineBackground(props.color)}`} src={ props.image } />
            </div>
        </aside>
    );
}

export default AllyTile;

// PROP-TYPES
AllyTile.propTypes = {
    openModal : PropTypes.func.isRequired,
    basics : PropTypes.object,
    alignment : PropTypes.string,
    color : PropTypes.string,
    dna : PropTypes.string,
    id : PropTypes.string,
    image : PropTypes.string.isRequired,
    power : PropTypes.number,
    sign : PropTypes.string,
    skills : PropTypes.arrayOf(PropTypes.string),
    ultimate : PropTypes.string
};