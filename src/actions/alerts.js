// ACTIONS
import { SET_ALERT, CLEAR_SINGLE_ALERT, CLEAR_ALL_ALERTS } from '~/actions/actions';

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

function clearAllAlerts(payload = null){
  return {
    type : CLEAR_ALL_ALERTS,
    payload
  }
}

export { setAlert, clearAlert, clearAllAlerts };