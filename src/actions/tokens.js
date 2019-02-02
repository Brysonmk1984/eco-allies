import generateSeed from '~/common/generateNum';
import { insertSimpleToken } from '~/common/tokenService';
import { sendRedeemCode, sendProof, checkParamAgainstCode } from '~/common/redeemService';
// ACTIONS
import { SET_ALLIES } from '~/actions/actions';

function setAllies(payload = null){
  return {
    type : SET_ALLIES,
    payload
  }
}

// Get the Allies of a particular user from the blockchain
function getAlliesOfUser(fullAccount){
  return (dispatch, getState) => {
    const state = getState();

    if(fullAccount){
      console.log(1);
      return state.account.contractInstance.tokensOfOwner.call(state.account.publicEthKey).then((tokens)=>{
        const tokenPositions = tokens.map((token) =>{
          return token.toNumber();
        });
        
        const allies = [];
        const tokenPromises = tokenPositions.map((tp) => {
          return state.account.contractInstance.getEcoAlly(tp);
        });
        console.log(2);
        Promise.all(tokenPromises).then((values) =>{
            values.forEach((ally,i)=>{
              let allyDnaString = ally[0].toString();
              if(allyDnaString.length === 15){
                allyDnaString = '0' + allyDnaString;
              }
              allies.push({dna : allyDnaString, id : ally[1].toNumber()});
            });
            console.log(3);
            dispatch(setAllies(allies));
        });
  
      });
    }else{
      fetchSimpleTokens(state.account.email)
      .then((data) =>{
        console.log('DATA', data);
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
      state.account.contractInstance.addAlly(num, {from : state.account.publicEthKey});
    }else{console.log('making');
      insertSimpleToken(num, state.account.email)
      .then((data)=>{
        console.log('new inserted token', data);
      })
      .catch((err) =>{
        console.log('EEERR', err);
      })
    }
  }
}

// Transfer ally from one address to another
function transferAlly(to, allyIndex = 0){
  return (dispatch, getState) => {
    const state = getState();
    const from = state.account.publicEthKey;
    if(to !== state.account.publicEthKey){
      //console.log('going', to, allyIndex);
      state.account.contractInstance.transferEcoAlly(from, to, allyIndex, {from : state.account.publicEthKey});
    }else{
      alert('please enter an account that\'s not your own');
    }
  }
  
}

// Handle redeem
function handleRedeem(code, email){
  return sendRedeemCode({code, email})
  .then((data)=>{
    return data;
  });
}

// Handle redeem
function handleProof(formData){
  return sendProof(formData)
  .then((data)=>{
    return data;
  });
}

// Check URL param against code in DB
function handleCheckParamAgainstCode(param){
  return checkParamAgainstCode(param)
  .then((data)=>{
    return data;
  });
}

export { setAllies, getAlliesOfUser, buildAlly, transferAlly, handleRedeem, handleProof, handleCheckParamAgainstCode };