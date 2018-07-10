import React from 'react';
import { Dialog } from '@material-ui/core';

export default class TransferModal extends React.Component{
    constructor(){
        super();
        this.state = {
            modalOpen : false
        }
    }

    render(){

        return(
            <Dialog
                contentClassName={'modal-container'}
                title={`Transfer Ally to Another Address`}
                autoScrollBodyContent={true}
                autoDetectWindowHeight={true}
                modal={false}
                contentStyle={{ width: '100%', maxWidth: 'none' }}
                open={this.state.modalOpen}
                //onRequestClose={() => this.props.toggleModal()}
            >
                test
            </Dialog>

        );
    }
}