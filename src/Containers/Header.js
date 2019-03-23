// REACT
import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import Nav from '~/Components/Header/Nav';
// ACTIONS
import { handleLogin } from '~/actions';
// ASSETS
import beta from '~/assets/images/beta.png';

// COMPONENT
const HeaderContainer = (props) => {
    return  <header>
        <Nav account={props.account} pathname={props.pathname} handleLogin={props.handleLogin} />
        <div className="brand">
        <h1>ECO ALLIES<img src={beta} className="beta" /></h1>
        <p>Defenders of Gaia</p>
        </div>
        <div className="belt"></div>
    </header>     
};

function mapStateToProps(state){
    return {
        account : state.account,
        pathname : state.route.pathname ? state.route.pathname : '/'
    }
}

const mapDispatchToProps = {
    handleLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);