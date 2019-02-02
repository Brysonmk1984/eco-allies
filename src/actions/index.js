// BLOCK CHAIN
import TruffleContract from 'truffle-contract';
  // for testing only
import contractJson from '../../build/contracts/EcoAllyCore.json';
// COMMON
import { login, logout } from '~/common/loginService';
import history from '~/common/history';
// ACTIONS
import { SET_CONTRACT_INSTANCE, SET_ACCOUNT_INFO, SET_PATHNAME } from '~/actions/actions';
import { setAllies, getAlliesOfUser, buildAlly, transferAlly, handleRedeem, handleProof, handleCheckParamAgainstCode } from '~/actions/tokens';
import { setAlert, clearAlert, clearAllAllerts } from '~/actions/alerts';

// Handle login to node backend on heroku
function handleLogin(doLogin, email, password){
  return (dispatch, getState) => {
    const state = getState();
    if(doLogin){
      return login({ email, password })
      .then((data)=>{
        console.log('THE DATA', data);
        return data;
      });
      
    }else if(doLogin === false){
      return logout()
      .then((data)=>{
        console.log('Data', data);
        if(data.error){
          console.log('ERROR - ', data.error);
          return dispatch(setAlert({type : 'error', message : data.error}));
        } 
        setAccountInfo({loggedIn:false, publicEthKey: ''});
        setTimeout(()=>(history.push(`${APP_ROOT}login`)),1000);
    
      })
      .catch((error)=>{
        console.log('log out failure!!', error);
      });
    }
  }
}

function initWeb3(){
  return (dispatch, getState) =>{
    // Check if Web 3 has been injected by the browser
    if(typeof web3 !== 'undefined'){
      // Use Browser/metamask version
      const web3Provider = web3.currentProvider;
      web3Provider.enable();

      web3 = new Web3(web3Provider);
      // instantiate a new truffle contract
      const tContract = TruffleContract(contractJson);
      tContract.setProvider(web3Provider);
      // Deploy smart Contract
      return tContract.deployed().then((instance) => {
        // Set contract instance to state
        dispatch({type : SET_CONTRACT_INSTANCE,payload : {contractInstance : instance}});
        // Check for matching account between registered eth key and the currently active metamask account.
        return web3.eth.getAccounts((err,accounts) =>{
          const publicEthKey = getState().account.publicEthKey.toLowerCase();
          let metamaskError = null;
          if(err) metamaskError = err;
          if( accounts[0] === publicEthKey){
            return dispatch(getAlliesOfUser(getState().account.fullAccount));
          }else{
            metamaskError = `Please sign into account ${publicEthKey} in metamask!`;
            return dispatch(setAlert({type : 'error', message : metamaskError}));
          }
        });
      });
    }else{
      dispatch(setAlert({type : 'error', message : 'You must have metamask installed and enabled for a Full Account.'}));
    }
  }
}


function setAccountInfo(payload = null){
  return {
    type : SET_ACCOUNT_INFO,
    payload
  }
}


function setPathname(payload = null){
  return {
    type : SET_PATHNAME,
    payload
  }
}

export { buildAlly, transferAlly, getAlliesOfUser, initWeb3, setAccountInfo, setAllies, setAlert, clearAlert, clearAllAllerts, setPathname, handleRedeem, handleProof, handleCheckParamAgainstCode, handleLogin };