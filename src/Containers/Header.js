// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import Nav from '~/Components/Header/Nav';
// ACTIONS
import { handleLogin } from '~/actions';


// COMPONENT
const HeaderContainer = (props) => {
    return  <header>
        <Nav account={props.account} handleLogin={props.handleLogin} />
        <div className="brand">
        <h1>ECO ALLIES</h1>
        <p>Defenders of Gaia</p>
        </div>
        <div className="belt"></div>
    </header>     
};

function mapStateToProps(state){
    return {
        account : state.account
    }
}

const mapDispatchToProps = {
    handleLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);