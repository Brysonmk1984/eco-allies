// ACTIONS
import { ACCOUNT_INFO_TO_STATE, ALLIES_TO_STATE, ALERT_TO_STATE, CLEAR_SINGLE_ALERT_FROM_STATE,  CLEAR_ALL_ALERTS_FROM_STATE } from '~/actions/actions';

function setAccountInfoToState(payload = null){
  return {
    type : ACCOUNT_INFO_TO_STATE,
    payload
  }
}

function setAlliesToState(payload = null){
  return {
    type : ALLIES_TO_STATE,
    payload
  }
}

function setAlertToState(payload = null){
  return {
    type : ALERT_TO_STATE,
    payload
  }
}

function clearSingleAlertFromState(payload = null){
  return {
    type : CLEAR_SINGLE_ALERT_FROM_STATE,
    payload
  }
}

function clearAllAlertsFromState(payload = null){
  return {
    type : CLEAR_ALL_ALERTS_FROM_STATE,
    payload
  }
}

export { setAccountInfoToState, setAlliesToState, setAlertToState, clearSingleAlertFromState, clearAllAlertsFromState };