import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button  } from '@material-ui/core';

export default class TransferModal extends React.Component{
    constructor(){
        super();
        this.state = {
            modalOpen : false,
            allyId : null,
            address : "0xcc1A64c458ba381C593aD92CA651Fb276092A1D3"
        }
    }

    toggleModal(id){console.log('TMID', id);
        this.setState((prevState) =>({
            modalOpen : !prevState.modalOpen,
            allyId : id ? id : null
        }));
    }

    transferAlly(e){
        e.preventDefault();console.log('!!!', this.state.address, this.state.allyId);
        this.props.transferAlly(this.state.address, this.state.allyId);
    }

    handleChange(e){
        this.setState({address : e.target.value});
    }

    componentDidMount() {
        this.props.onRef(this);
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
                        Enter the Ethereum address you would like to transfer this ally to
                    </DialogContentText>
                    <form onSubmit={(e) =>{this.transferAlly(e, this.state.address, this.state.allyId)}}>
                        <div className="address-input-container">
                            <input value={this.state.address} onChange={this.handleChange.bind(this)} type="text" placeholder="Address" maxLength="42" />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.toggleModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.transferAlly.bind(this)} color="primary">
                        Transfer
                    </Button>
            </DialogActions>
            </Dialog>

        );
    }
}