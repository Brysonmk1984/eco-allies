import { combineReducers } from 'redux';
import * as actions from '~/actions';

const AccountReducer = function(){
  return {
    publicEthKey : '',
    email : '',
    fullAccount : false,
    loggedIn : false
  }
};

const AlertReducer = function(){
  return {
    alerts : [{ type : 'error', message : 'Dummy error from alert reducer'}],
  }
};

const AlliesReducer = function(state = [], action = {} ){

  switch (action.type){
      case 'ALLIES_TO_STATE':
        return [...action.payload];
      default :
        return state;
  }
};

const RouteReducer = function(){
  return {
    route : '/'
  }
};

const rootReducer = combineReducers({
  account : AccountReducer,
  alerts : AlertReducer,
  allies : AlliesReducer,
  route : RouteReducer,
});

export default rootReducer;