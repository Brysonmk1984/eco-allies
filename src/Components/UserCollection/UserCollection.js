// REACT
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// COMPONENTS
import AllyListPage from './AllyListPage/AllyListPage';
import AllyPage from './AllyPage/AllyPage';

// COMPONENT
export default class UserCollection extends React.Component{
    
    // One of two different views is rendered depending on if a user navigates
    // to /user-collection or /user-collection/{{allyDna}}
    // withRouter(component) grants browser history functionality
    render(){
        return(
            <div className="page-wrapper user-collection-page">
                <Route exact path="/user-collection/"  render={() => (
                    <AllyListPage handleLogin={this.props.handleLogin} loggedIn={this.props.loggedIn} allies ={this.props.allies}  buildAlly={this.props.buildAlly} />
                )} />
                <Route path="/user-collection/:allyDna"  render={
                    withRouter((props) => ( <AllyPage {...props} transferAlly={this.props.transferAlly} /> ))
                } />
            </div>
        );
    }
}

// PROP-TYPES
UserCollection.propTypes = {
    loggedIn : PropTypes.bool.isRequired,
    allies : PropTypes.array.isRequired,
    buildAlly : PropTypes.func.isRequired,
    handleLogin : PropTypes.func.isRequired,
    transferAlly : PropTypes.func.isRequired
};