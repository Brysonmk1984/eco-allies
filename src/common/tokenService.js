import axios from 'axios';
const endpoint = process.env.NODE_ENV === 'production' ?  'https://eco-allies.herokuapp.com/' : 'http://localhost:3001/';

const fetchSimpleTokens = function(owner){
  return axios.post(`${endpoint}tokens/retrieve-simple-tokens`, {owner}, {withCredentials:true})
  .then((data) => {
    console.log('simple token data', data);
    return data.data;
  })
  .catch((error)=>{
      console.log('simple token error', error);
      return { error : [{type : 'AJAX Error', message : `Couldn't communicate with server to fetch simple token!`}] }
  });
};

const insertSimpleToken = function(token, owner){
  return axios.post(`${endpoint}tokens/insert-simple-token`, {token, owner}, {withCredentials:true})
  .then((data) =>{
    console.log('insert token data', data);
    return data
  }).catch((error)=>{
    console.log('simple token error', error);
    return { error : [{type : 'AJAX Error', message : `Couldn't communicate with server to insert token!`}] }
  });
};

export { fetchSimpleTokens, insertSimpleToken }