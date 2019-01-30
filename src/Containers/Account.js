// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import Account from '~/Components/Account/Account';

// COMPONENT
const AccountContainer = (props) =>{
  return(
    <Account allies={props.allies} account={props.account} />
  )
}


function mapStateToProps(state){
  return {
      allies : state.allies,
      account : state.account
  }
}

export default connect(mapStateToProps)(AccountContainer);