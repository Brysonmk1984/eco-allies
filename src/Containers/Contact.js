// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import Contact from '~/Components/Contact/Contact';
// ACTIONS
import { handleEmailSubmit, setAlert, clearAllAlerts } from '~/actions';
import { debug } from 'util';

// COMPONENT
class ContactContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : props.account.loggedIn ? props.account.email : '',
            message : ''
        };
    }

    // Handle change of email input and elements and update states
    handleEmailChange(e){
      const email = e.target.value;
      this.setState(() => ({email}));
    }

    // Handle change of textarea and update states
    handleMessageChange(e){
      const message = e.target.value;
      this.setState(() => ({message}));
    }

    // Handle submit of form: send form data to back end, which handles sending the email logic
    // If message was sent successfully, display success message, otherwise display error message
    handleSubmit(e){
        e.preventDefault();
        let accountInfo = this.props.account;
        if(accountInfo.loggedIn){
          accountInfo = Object.assign({}, this.props.account);
          delete accountInfo.contractInstance;
        }else{
          accountInfo = null;
        }

        this.props.handleEmailSubmit({ email :this.state.email, message : this.state.message, accountInfo : accountInfo })
        .then((data) =>{
            this.props.clearAllAlerts();
            this.props.setAlert({type : 'success', message : "Email has been sent! We will try to respond to your message in a timely manner."});
            const top = document.getElementById("alertWrapper").offsetTop;
            window.scrollTo(0, top);
        });
    }

    render(){
        return(
           <Contact email={this.state.email} message={this.state.message} handleEmailChange={this.handleEmailChange.bind(this)} handleMessageChange={this.handleMessageChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
        );
    }
}

function mapStateToProps(state){
  return {
    alerts : state.alerts,
    account : state.account
  }
}

const mapDispatchToProps = {
  handleEmailSubmit,
  setAlert, 
  clearAllAlerts
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);