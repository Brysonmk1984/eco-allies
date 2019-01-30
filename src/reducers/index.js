import { combineReducers } from 'redux';
// ACTIONS
import { ACCOUNT_INFO_TO_STATE, ALLIES_TO_STATE , ALERT_TO_STATE, CLEAR_ALL_ALERTS_FROM_STATE, CLEAR_SINGLE_ALERT_FROM_STATE} from '~/actions/actions';

const initialAccountState = {
  publicEthKey : '',
  email : '',
  fullAccount : false,
  loggedIn : false
};

const AccountReducer = function(state = initialAccountState, action = { type : null, payload : null}){
  switch(action.type){
    case ACCOUNT_INFO_TO_STATE :
      return Object.assign({}, state, action.payload);
    default :
      return state;
  }
};

const AlertReducer = function(state = [], action = { type : null, payload : null }){
  switch(action.type){
    case ALERT_TO_STATE :
      return [...state, action.payload];
    case CLEAR_SINGLE_ALERT_FROM_STATE :
      const alerts = [...state];
      alerts.splice(action.payload,1);
      return alerts;
    case CLEAR_ALL_ALERTS_FROM_STATE :
      return [];
    default:
      return state;
  }
};

const AlliesReducer = function(state = [], action = { type:null, payload : null} ){
  switch (action.type){
      case ALLIES_TO_STATE:
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