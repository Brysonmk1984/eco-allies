import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button  } from '@material-ui/core';
import { bindAddModalCombo } from '~/common/customKeyBindings';

export default class AddModal extends React.Component{
    constructor(){
        super();
        this.state = {
            modalOpen : false,
        }
        this.toggleAddModal = this.toggleAddModal.bind(this);
    }

    addAlly(){
        this.props.buildAlly();
    }

    toggleAddModal(){
        this.setState((prevState) =>({
            modalOpen : !prevState.modalOpen
        }));
    }

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