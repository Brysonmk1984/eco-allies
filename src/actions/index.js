// BLOCK CHAIN
import TruffleContract from 'truffle-contract';
  // for testing only
import contractJson from '../../build/contracts/EcoAllyCore.json';
// COMMON
import { login, logout, loggedIn } from '~/common/loginService';
import { sendEmail } from '~/common/contactService';
import history from '~/common/history';
import { openRoutes } from '~/common/config';
// ACTIONS
import { SET_CONTRACT_INSTANCE, SET_ACCOUNT_INFO, SET_PATHNAME } from '~/actions/actions';
import { setAllies, getAlliesOfUser, buildAlly, transferAlly, handleRedeem, handleProof, handleCheckParamAgainstCode } from '~/actions/tokens';
import { setAlert, clearAlert, clearAllAlerts } from '~/actions/alerts';

function checkLoggedIn(email){
  return (dispatch, getState) =>{
    const token = localStorage.getItem('token');
    
    if(token){console.log('EMAIL', email);
      loggedIn()
      .then((data)=>{
        if(data && data.data.fullAccount){
          dispatch(setAccountInfo({ loggedIn : true, fullAccount : data.data.fullAccount, email : data.data.email, username : data.data.username, publicEthKey : data.data.publicEthKey }));
        }else{
          dispatch(setAccountInfo({ loggedIn : true, fullAccount : data.data.fullAccount, email : data.data.email, username : data.data.username }));
        }
      }).catch((e) =>{return;});
    } else {
      const isOpenRoute = openRoutes.find((route) => {
        return route === history.location.pathname;
      });
      // If the route is protected, dispatch an alert and redirect the user
      if(!isOpenRoute){
        dispatch(setAlert({type : 'error', message : "You are not authenticated; please login."}));
        setTimeout(()=>(history.push(`${APP_ROOT}login`)),1000);
      }
    }
  }
}

// Handle login to node backend on heroku
function handleLogin(doLogin, email, password){
  return (dispatch, getState) => {
    if(doLogin){
      return login({ email, password })
      .then((data)=>{
        localStorage.setItem('token', data.token);
        return data;
      });
      
    }else if(doLogin === false){
      return logout()
      .then((data)=>{
        if(data.error){
          return dispatch(setAlert({type : 'error', message : data.error}));
        } 
        localStorage.removeItem('token');
        dispatch(setAccountInfo({loggedIn:false, publicEthKey: '', fullAccount: false, username:'',email:'', contractInstance:null}));
        setTimeout(()=>(history.push(`${APP_ROOT}login`)),1000);
    
      })
      .catch((error)=>{
        dispatch(setAlert({type : 'error', message : error}));
      });
    }
  }
}

function setLsJwt(token){
  localStorage.setItem('token', token);
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

function handleEmailSubmit(formData){

  return (dispatch, getState) =>{
    return sendEmail(formData)
    .then((data)=>{
      return data;
    });
  };
  
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

export { handleEmailSubmit, setLsJwt, buildAlly, transferAlly, getAlliesOfUser, initWeb3, setAccountInfo, setAllies, setAlert, clearAlert, clearAllAlerts, setPathname, handleRedeem, handleProof, handleCheckParamAgainstCode, handleLogin, checkLoggedIn };