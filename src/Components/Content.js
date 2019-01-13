// REACT
import React from 'react';
import { Route, Switch } from 'react-router';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import About from './About/About';
import Gallery from './Gallery/Gallery';
import UserCollection from './UserCollection/UserCollection';
import Register from './Register/Register';
import Login from './Login/Login';
import Account from './Account/Account';
import Redeem from './Redeem/Redeem';
import Proof from './Proof/Proof';

// COMPONENT
// Displays app content between header and footer depending on the route
export default class Content extends React.Component{

    render(){
        return(
            <div className="route-wrapper">
                <Switch>
                    <Route exact path={`${APP_ROOT}`} component={About}  />
                    <Route path={`${APP_ROOT}about`} component={About} />
                    <Route path={`${APP_ROOT}proof`} component={() => (<Proof handleProof={this.props.handleProof} />)} />
                    <Route exact path={`${APP_ROOT}redeem`} component={() => (<Redeem handleRedeem={this.props.handleRedeem} getAccountDetails={this.props.getAccountDetails}  buildAlly={this.props.buildAlly} /> )} /> 
                    <Route path={`${APP_ROOT}redeem/:qr`} component={(props) => (<Redeem {...props}  handleRedeem={this.props.handleRedeem} checkParamAgainstCode={this.props.checkParamAgainstCode} getAccountDetails={this.props.getAccountDetails}  buildAlly={this.props.buildAlly} /> )} /> 
                    <Route path={`${APP_ROOT}gallery`} component={() => (<Gallery  /> )} />
                    <Route path={`${APP_ROOT}user-collection`}  render={() => <UserCollection loggedIn={this.props.appState.loggedIn} allies ={this.props.appState.allies}  buildAlly={this.props.buildAlly}  transferAlly={this.props.transferAlly} />}   />
                    <Route path={`${APP_ROOT}register`} component={() => (<Register  modifyAppState={this.props.modifyAppState} loggedIn={this.props.loggedIn}  /> )} />
                    <Route path={`${APP_ROOT}login`} component={() => (<Login modifyAppState={this.props.modifyAppState} handleLogin={this.props.handleLogin} loggedIn={this.props.loggedIn}   /> )} /> 
                    <Route path={`${APP_ROOT}account`} component={() =>( <Account allies={this.props.appState.allies} getAccountDetails={this.props.getAccountDetails} /> )}  />
                    {/* <Route path="faq" component={Faq} />*/}
                </Switch>
            </div>
        );
    }
}

// PROP-TYPES
Content.propTypes = {
    appState : PropTypes.shape({
        publicEthKey : PropTypes.string.isRequired,
        allies : PropTypes.array.isRequired,
        loggedIn : PropTypes.bool.isRequired,
        email : PropTypes.string.isRequired
    }),
    buildAlly : PropTypes.func.isRequired,
    getAccountDetails : PropTypes.func.isRequired,
    handleLogin : PropTypes.func.isRequired,
    modifyAppState : PropTypes.func.isRequired,
    transferAlly : PropTypes.func.isRequired,
    handleRedeem : PropTypes.func.isRequired,
    handleProof : PropTypes.func.isRequired
};
