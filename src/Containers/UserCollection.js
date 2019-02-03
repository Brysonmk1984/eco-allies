// REACT
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import AllyListPage from '~/Components/UserCollection/AllyListPage/AllyListPage';
import AllyPage from '~/Components/UserCollection/AllyPage/AllyPage';
// ACTIONS
import { buildAlly, transferAlly } from '~/actions';

// COMPONENT
class UserCollectionContainer extends React.Component{
    
    // One of two different views is rendered depending on if a user navigates
    // to /user-collection or /user-collection/{{allyDna}}
    // withRouter(component) grants browser history functionality
    render(){
        return(
            <div className="page-wrapper user-collection-page">
                <Route exact path={`${APP_ROOT}user-collection`}  render={() => (
                    <AllyListPage loggedIn={this.props.account.loggedIn} username={this.props.account.username} allies={this.props.allies}   buildAlly={this.props.buildAlly} />
                )} />
                <Route path={`${APP_ROOT}user-collection/:allyDna`}  render={
                    withRouter((props) => ( <AllyPage {...props} allies={props.account.allies} transferAlly={props.transferAlly} /> ))
                } />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        allies : state.allies,
        account : state.account
    }
}

const mapDispatchToProps = {
  buildAlly,
  transferAlly
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCollectionContainer);