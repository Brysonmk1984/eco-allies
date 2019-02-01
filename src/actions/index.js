// ACTIONS
import { SET_ACCOUNT_INFO, SET_ALLIES, SET_ALERT, CLEAR_SINGLE_ALERT,  CLEAR_ALL_ALERTS, SET_PATHNAME } from '~/actions/actions';

function setAccountInfo(payload = null){
  return {
    type : SET_ACCOUNT_INFO,
    payload
  }
}

function setAllies(payload = null){
  return {
    type : SET_ALLIES,
    payload
  }
}

function setAlert(payload = null){
  return {
    type : SET_ALERT,
    payload
  }
}

function clearAlert(payload = null){
  return {
    type : CLEAR_SINGLE_ALERT,
    payload
  }
}

function clearAllAllerts(payload = null){
  return {
    type : CLEAR_ALL_ALERTS,
    payload
  }
}

function setPathname(payload = null){
  return {
    type : SET_PATHNAME,
    payload
  }
}

export { setAccountInfo, setAllies, setAlert, clearAlert, clearAllAllerts, setPathname };