// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button  } from '@material-ui/core';


// COMPONENT
export default class TransferModal extends React.Component{
    constructor(){
        super();
        this.state = {
            modalOpen : false,
            allyId : null,
            address : "0xcc1A64c458ba381C593aD92CA651Fb276092A1D3"
        }
    }

    // State updates for modal toggling
    toggleModal(id){
        this.setState((prevState) =>({
            modalOpen : !prevState.modalOpen,
            allyId : id ? id : null
        }));
    }

    // Handle change of address value
    handleChange(e){
        this.setState({address : e.target.value});
    }

    // Transfer Ally to a new address, with the default being pulled from state
    transferAlly(e){
        e.preventDefault();
        this.props.transferAlly(this.state.address, this.state.allyId);
    }

    // On component mount, assign parent's ref to this component
    componentDidMount() {
        this.props.onRef(this);
    }
    

    render(){console.log(this.props);

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
                    <form>
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

TransferModal.propTypes = {
    onRef : PropTypes.func.isRequired,
    toggleModal : PropTypes.func.isRequired,
    transferAlly : PropTypes.func.isRequired,
};