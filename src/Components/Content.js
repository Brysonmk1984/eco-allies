import React from 'react';
import { Route, Switch } from 'react-router';
import About from './About/About';
import Gallery from './Gallery/Gallery';
import UserCollection from './UserCollection/UserCollection';
import Register from './Register/Register';
import Login from './Login/Login';
import Account from './Account/Account';

class Content extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="route-wrapper">
                <Switch>
                    {/* <Route exact path="/" component={() => (<UserCollection allies={this.props.allies}  buildAlly={this.props.buildAlly}  transferAlly={this.props.transferAlly} /> )}  /> */}
                    <Route exact path="/" component={() => (<Gallery   /> )}  />
                    <Route path="/about" component={About} />
                    <Route path="/gallery" component={() => (<Gallery  /> )} />
                    <Route path="/user-collection"  render={() => <UserCollection handleLogin={this.props.handleLogin} loggedIn={this.props.loggedIn} allies ={this.props.allies}  buildAlly={this.props.buildAlly}  transferAlly={this.props.transferAlly} />}   />
                    <Route path="/register" component={() => (<Register   /> )} />
                    <Route path="/login" component={() => (<Login modifyAppState={this.props.modifyAppState} handleLogin={this.props.handleLogin} loggedIn={this.props.loggedIn}   /> )} /> 
                    <Route path="/account" component={() =>( <Account appState={this.props.appState} getAccountDetails={this.props.getAccountDetails} /> )}  />
                    {/* <Route path="faq" component={Faq} />*/}
                </Switch>
            </div>
        );
    }
}

export default Content;