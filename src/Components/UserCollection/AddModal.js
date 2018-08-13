// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button  } from '@material-ui/core';
// COMMON
import { bindAddModalCombo } from '~/common/customKeyBindings';

// COMPONENT
export default class AddModal extends React.Component{
    constructor(){
        super();
        this.state = {
            modalOpen : false,
        }
        this.toggleAddModal = this.toggleAddModal.bind(this);
    }

    // Calls the buildAlly method from App.js, which creates a new ally on the block chain
    addAlly(){
        this.props.buildAlly();
    }

    // Toggle state of add modal
    toggleAddModal(){
        this.setState((prevState) =>({
            modalOpen : !prevState.modalOpen
        }));
    }

    // On component mount, set key binding for adding an ally
    // remove this before release 
    componentDidMount() {
        bindAddModalCombo(this.toggleAddModal);
    }
    
    render(){
        return(
            <Dialog
            title={`Add Ally to Current Ethereum Address`}
            open={this.state.modalOpen}
            onClose={this.toggleAddModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Transfer Ally to Another Address"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Good Luck!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.toggleAddModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.addAlly.bind(this)} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// PROP-TYPES
AddModal.propTypes = {
    buildAlly : PropTypes.func.isRequired
};