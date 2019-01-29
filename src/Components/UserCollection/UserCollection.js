// REACT
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import AllyListPage from './AllyListPage/AllyListPage';
import AllyPage from './AllyPage/AllyPage';

// COMPONENT
class UserCollection extends React.Component{
    
    // One of two different views is rendered depending on if a user navigates
    // to /user-collection or /user-collection/{{allyDna}}
    // withRouter(component) grants browser history functionality
    render(){
        return(
            <div className="page-wrapper user-collection-page">
                <Route exact path={`${APP_ROOT}user-collection`}  render={() => (
                    <AllyListPage loggedIn={this.props.loggedIn} allies={this.props.allies}   buildAlly={this.props.buildAlly} />
                )} />
                <Route path={`${APP_ROOT}user-collection/:allyDna`}  render={
                    withRouter((props) => ( <AllyPage {...props} allies={this.props.allies} transferAlly={this.props.transferAlly} /> ))
                } />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        allies : state.allies
    }
}
export default connect(mapStateToProps)(UserCollection);

// PROP-TYPES
UserCollection.propTypes = {
    loggedIn : PropTypes.bool.isRequired,
    //allies : PropTypes.array.isRequired,
    buildAlly : PropTypes.func.isRequired,
    transferAlly : PropTypes.func.isRequired
};