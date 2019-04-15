// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import SuperRare from '~/Components/SuperRare/SuperRare';

//COMPONENT
class SuperRareContainer extends React.Component{
  
  render(){

    return(
      <SuperRare />
    );
  }
}

function mapStateToProps(state){
  return {
  
  }
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SuperRareContainer);