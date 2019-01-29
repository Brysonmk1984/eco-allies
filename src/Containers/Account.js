// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import Account from '~/Components/Account/Account';


function mapStateToProps(state){
  return {
      allies : state.allies
  }
}

export default connect(mapStateToProps)(Account);