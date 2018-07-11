import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button  } from '@material-ui/core';

export default class TransferModal extends React.Component{
    constructor(){
        super();
        this.state = {
            modalOpen : false
        }
    }

    toggleModal(){
        this.setState((prevState) =>({
            modalOpen : !prevState.modalOpen
        }));
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    render(){

        return(


            <Dialog
            title={`Transfer Ally to Another Address`}
            open={this.state.modalOpen}
            onClose={this.props.toggleModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Transfer Ally to Another Address"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.toggleModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.transferAlly} color="primary">
                        Transfer
                    </Button>
            </DialogActions>
            </Dialog>

        );
    }
}