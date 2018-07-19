import React from 'react';
import { Button } from '@material-ui/core';
import { FaBars } from 'react-icons/lib/fa';

export default class AllyMenu extends React.Component{
    render(){
        return(
            <div className="ally-action-menu">
                <Button
                 variant="fab"
                 mini
                    onClick={this.props.toggleModal.bind(this)}
                    >
                    <FaBars size={14} />
                </Button>
            </div>
        );
    }
}