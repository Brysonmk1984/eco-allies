// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { FaBars } from 'react-icons/lib/fa';

// COMPONENT
export default class AllyMenu extends React.Component{
    render(){
        return(
            <div className="ally-action-menu">
                <Button
                 variant="fab"
                 mini
                    onClick={this.props.toggleModal}
                    >
                    <FaBars size={14} />
                </Button>
            </div>
        );
    }
}

// PROP-TYPES
AllyMenu.propTypes = {
    toggleModal: PropTypes.func.isRequired
}