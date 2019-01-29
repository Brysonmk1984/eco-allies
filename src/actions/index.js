const FETCH_SIMPLE_ALLIES = 'FETCH_SIMPLE_ALLIES';
const ALLIES_TO_STATE = 'ALLIES_TO_STATE';
const ADD_SIMPLE_ALLY = 'ADD_SIMPLE_ALLY';
const ADD_BLOCKCHAIN_ALLY = 'ADD_BLOCKCHAIN_ALLY';

function fetchSimpleAllies(payload = null){
  return {
    type : FETCH_SIMPLE_ALLIES,
    payload
  }
}

function setAlliesToState(payload = null){
  return {
    type : ALLIES_TO_STATE,
    payload
  }
}

function addSimpleAlly(payload = null){
  return {
    type : ADD_SIMPLE_ALLY,
    payload
  }
}

function addBlockchainAlly(payload = null){
  return {
    type : ADD_BLOCKCHAIN_ALLY,
    payload
  }
}

export { fetchSimpleAllies, setAlliesToState, addSimpleAlly, addBlockchainAlly};