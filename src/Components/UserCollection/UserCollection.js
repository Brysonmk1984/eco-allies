import React from 'react';
import { Route, withRouter } from 'react-router';
import AllyListPage from './AllyListPage/AllyListPage';
import AllyPage from './AllyPage/AllyPage';
import './userCollection.scss';


export default class UserCollection extends React.Component{
    render(){
        console.log('MATCH', this.props.match);
        return(
            <div className="page-wrapper user-collection-page">
                <Route exact path="/user-collection/"  render={() => (<AllyListPage handleLogin={this.props.handleLogin} loggedIn={this.props.loggedIn} allies ={this.props.allies}  buildAlly={this.props.buildAlly}  transferAlly={this.props.transferAlly} />)}   />
                <Route path="/user-collection/:allyId"  render={() => (<AllyPage />)}   />
            </div>
        );
    }
}
    
  
