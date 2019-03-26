// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// ASSETS
import './allyTile.scss';
// ASSETS
import fist from '~/assets/images/fist.png';

// COMPONENT
const AllyTile = function(props){
    return(
        <aside className="ally">
            <div className={`ally-image`} onClick={props.openModal.bind(this, props )}>
                <img className={` ${props.backgroundClasses}`} src={ props.image } />
                <div className="display_power">
                    <span>
                        <img src={fist} />
                        <span>{props.power}</span>
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default AllyTile;

// PROP-TYPES
AllyTile.propTypes = {
    openModal : PropTypes.func.isRequired,
    backgroundClasses : PropTypes.string,
    basics : PropTypes.object,
    alignment : PropTypes.string,
    color : PropTypes.string,
    dna : PropTypes.string,
    id : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image : PropTypes.string.isRequired,
    power : PropTypes.number,
    sign : PropTypes.string,
    skills : PropTypes.arrayOf(PropTypes.string),
    ultimate : PropTypes.string
};