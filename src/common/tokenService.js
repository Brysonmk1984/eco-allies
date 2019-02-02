import axios from 'axios';
const endpoint = process.env.NODE_ENV === 'production' ?  'https://eco-allies.herokuapp.com/' : 'http://localhost:3001/';

const fetchSimpleTokens = function(owner){
  return axios.post(`${endpoint}tokens/retrieve-simple-tokens`, {owner}, {withCredentials:true})
  .then((data) => {
    return data.data;
  })
  .catch((error)=>{
      return { error : [{type : 'error', message : `Couldn't communicate with server to fetch simple token!`}] }
  });
};

const insertSimpleToken = function(token, owner){
  return axios.post(`${endpoint}tokens/insert-simple-token`, {token, owner}, {withCredentials:true})
  .then((data) =>{
    return data
  }).catch((error)=>{
    return { error : [{type : 'error', message : `Couldn't communicate with server to insert token!`}] }
  });
};

export { fetchSimpleTokens, insertSimpleToken }