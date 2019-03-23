import generateSeed from '~/common/generateNum';
import { insertSimpleToken, fetchSimpleTokens } from '~/common/tokenService';
import { sendRedeemCode, sendProof, checkParamAgainstCode } from '~/common/redeemService';
// ACTIONS
import { SET_ALLIES } from '~/actions/actions';
import { setAlert } from '~/actions/alerts';

function setAllies(payload = null){
  return {
    type : SET_ALLIES,
    payload
  }
}

// FORTMATIC -  Get the Allies of a particular user from the blockchain
function getAlliesOfUser(fullAccount){
  return (dispatch, getState) => {
    const state = getState();
    if(fullAccount){
      return state.account.contractInstance.methods.tokensOfOwner(state.account.publicEthKey).call().then((tokens)=>{
        const allies = [];
        const tokenPromises = tokens.map((tp) => {
          return state.account.contractInstance.methods.getEcoAlly(tp).call();
        });
        Promise.all(tokenPromises).then((values) =>{
            values.forEach((ally,i)=>{
              let allyDnaString = ally[0].toString();
              if(allyDnaString.length === 15){
                allyDnaString = '0' + allyDnaString;
              }
              allies.push({dna : allyDnaString, id : ally[1]});
            });
            dispatch(setAllies(allies));
        }).catch(error => { 
          dispatch(setAlert({type : 'error', message : error }));
        });
      });
    }else{
      fetchSimpleTokens(state.account.email)
      .then((data) =>{
        dispatch(setAllies(data.tokenArray));
      });
    }
  }
}

function buildAlly(payload = null){
  return (dispatch, getState) => {
    const state = getState();
    const num = generateSeed();
    if(state.account.fullAccount){
      console.log('LOOK', num, state.account.publicEthKey, state.account.contractInstance.methods.addAlly);
      
      web3.eth.getAccounts().then((accounts) => {
        state.account.contractInstance.methods.addAlly(num)
        .then((data) =>{
            dispatch(getAlliesOfUser(state.account.fullAccount));
        });
      });
    }else{
      insertSimpleToken(num, state.account.email)
      .then((data)=>{
        dispatch(getAlliesOfUser(state.account.fullAccount));
      })
      .catch((error) =>{
        dispatch(setAlert({type : 'error', message : error}));
      })
    }
  }
}



// META_MASK -  Get the Allies of a particular user from the blockchain
// function getAlliesOfUser(fullAccount){
//   return (dispatch, getState) => {
//     const state = getState();

//     if(fullAccount){
//       return state.account.contractInstance.tokensOfOwner.call(state.account.publicEthKey).then((tokens)=>{
//         const tokenPositions = tokens.map((token) =>{
//           return token.toNumber();
//         });
        
//         const allies = [];
//         const tokenPromises = tokenPositions.map((tp) => {
//           return state.account.contractInstance.getEcoAlly(tp);
//         });
//         Promise.all(tokenPromises).then((values) =>{
//             values.forEach((ally,i)=>{
//               let allyDnaString = ally[0].toString();
//               if(allyDnaString.length === 15){
//                 allyDnaString = '0' + allyDnaString;
//               }
//               allies.push({dna : allyDnaString, id : ally[1].toNumber()});
//             });
//             dispatch(setAllies(allies));
//         }).catch(error => { 
//           dispatch(setAlert({type : 'error', message : error}));
//         });
//       });
//     }else{
//       fetchSimpleTokens(state.account.email)
//       .then((data) =>{
//         dispatch(setAllies(data.tokenArray));
//       });
//     }
//   }
// }

// function buildAlly(payload = null){
//   return (dispatch, getState) => {
//     const state = getState();
//     const num = generateSeed();
//     if(state.account.fullAccount){
//       state.account.contractInstance.addAlly(num, {from : state.account.publicEthKey})
//       .then((data) =>{
//           dispatch(getAlliesOfUser(state.account.fullAccount));
//       });
//     }else{
//       insertSimpleToken(num, state.account.email)
//       .then((data)=>{
//         dispatch(getAlliesOfUser(state.account.fullAccount));
//       })
//       .catch((error) =>{
//         dispatch(setAlert({type : 'error', message : error}));
//       })
//     }
//   }
// }

// Transfer ally from one address to another
function transferAlly(to, allyIndex = 0){
  return (dispatch, getState) => {
    const state = getState();
    const from = state.account.publicEthKey;
    if(to !== state.account.publicEthKey){
      state.account.contractInstance.transferEcoAlly(from, to, allyIndex, {from : state.account.publicEthKey});
    }else{
      dispatch(setAlert({type : 'error', message : 'please enter an account that\'s not your own'}));
    }
  }
  
}

// Handle redeem
function handleRedeem(code, email){
  return (dispatch, getState) =>{
    return sendRedeemCode({code, email})
    .then((data)=>{
      return data;
    });
  };
}

// Handle redeem
function handleProof(formData){
  return (dispatch, getState) =>{
    return sendProof(formData)
    .then((data)=>{
      return data;
    });
  };
}

// Check URL param against code in DB
function handleCheckParamAgainstCode(param){
  return (dispatch, getState) =>{
    return checkParamAgainstCode(param)
    .then((data)=>{
      return data;
    });
  };
}

export { setAllies, getAlliesOfUser, buildAlly, transferAlly, handleRedeem, handleProof, handleCheckParamAgainstCode };