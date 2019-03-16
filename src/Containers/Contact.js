// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import Contact from '~/Components/Contact/Contact';
// ACTIONS
import { handleEmailSubmit, setAlert, clearAllAlerts } from '~/actions';

// COMPONENT
class ContactContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            email : '',
            message : ''
        };
    }

    // Handle change of email input and elements and update states
    handleEmailChange(e){
      this.setState(() => ({
        email : e.target.value
      }));
    }

    // Handle change of textarea and update states
    handleMessageChange(e){
      this.setState(() => ({
        message : e.target.value
      }));
    }

    // Handle submit of form: send form data to back end, which handles sending the email logic
    // If message was sent successfully, display success message, otherwise display error message
    handleSubmit(e){
        e.preventDefault();
        console.log('ACC', this.props.account);

        this.props.handleEmailSubmit(this.state.email, this.state.message)
        .then((data) =>{
            console.log('in email sent then', data);
            
            this.props.clearAllAlerts();
            this.props.setAlert({type : 'success', message : "Email has been sent! We will try to respond to your message in a timely manner."});
            setTimeout(()=>{
              this.props.clearAllAlerts();
            },3000);
        }).catch(()=>{return;});
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