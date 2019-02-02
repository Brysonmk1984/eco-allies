import { combineReducers } from 'redux';
// ACTIONS
import { SET_CONTRACT_INSTANCE, SET_ACCOUNT_INFO, SET_ALLIES, ADD_ALLY, SET_ALERT, CLEAR_ALL_ALERTS, CLEAR_SINGLE_ALERT, SET_PATHNAME } from '~/actions/actions';
import { isArray } from 'util';

const initialAccountState = {
  publicEthKey : '',
  email : '',
  fullAccount : false,
  loggedIn : false,
  username : ''
};

const AccountReducer = function(state = initialAccountState, action = { type : null, payload : null}){
  switch(action.type){
    case SET_ACCOUNT_INFO :
      return Object.assign({}, state, action.payload);
    case SET_CONTRACT_INSTANCE :
      return Object.assign({}, state, action.payload);
    default :
      return state;
  }
};

const AlertReducer = function(state = [], action = { type : null, payload : null }){
  switch(action.type){
    case SET_ALERT :
      if(isArray(action.payload)){
        return [...state, ...action.payload];
      }else{
        return [...state, action.payload];
      }
    case CLEAR_SINGLE_ALERT :
      const alerts = [...state];
      alerts.splice(action.payload,1);
      return alerts;
    case CLEAR_ALL_ALERTS :
      return [];
    default:
      return state;
  }
};

const AlliesReducer = function(state = [], action = { type:null, payload : null} ){
  switch (action.type){
      case SET_ALLIES:
        return [...action.payload];
      default :
        return state;
  }
};

const RouteReducer = function(state = {}, action = { type : null, payload : null }){
  switch(action.type){
    case SET_PATHNAME :
      return { pathname : action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account : AccountReducer,
  alerts : AlertReducer,
  allies : AlliesReducer,
  route : RouteReducer,
});

export default rootReducer;