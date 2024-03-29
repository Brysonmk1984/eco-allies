import axios from 'axios';
const endpoint = process.env.NODE_ENV === 'production' ?  'https://eco-allies.herokuapp.com/' : 'http://localhost:3001/';
//const endpoint = process.env.NODE_ENV === 'production' ?  'https://eco-allies.herokuapp.com/' : 'https://eco-allies.herokuapp.com/';
const sendRedeemCode = function(formData){console.log('FD', formData);
    return axios.post(`${endpoint}tokens/retrieval-code`,{code: formData.code, email: formData.email}, {withCredentials:true})
    .then((data) => {console.log('datad', data);
        if(data.status === 200){
            const error = data.data.error;
            if(error){    
              if(data.data.claimedBy){
                return {error : {type : 'error', message : `Code already in use.`}}
              }
              return {error : {type : 'error', message : `Invalid Code`}}
            }
            return data.data;
        }else{
            return {type : 'error', message : `There was a server error with a status code of ${data.status}`}
        }
    }).catch((error) => {
        return { error }
    })
};

const checkParamAgainstCode = function(param){
    return axios.post(`${endpoint}tokens/check-param`,{param}, {withCredentials:true})
    .then((data) => {console.log('data', data);
        if(data.status === 200){
            const error = data.data.error;
            if(error){    
              if(data.data.claimedBy){
                return {error : {type : 'error', message : `Code already in use.`}}
              }
              return {error : {type : 'error', message : `Invalid Code`}}
            }
            return data.data;
        }else{
            return {type : 'error', message : `There was a server error with a status code of ${data.status}`}
        }
    }).catch((error) => {
        return { error }
    })
};

const sendProof = function(formData){console.log('FD', formData);
    return axios.post(`${endpoint}tokens/proof`, formData, {
        method: 'POST',
        withCredentials:true,
        headers: {'Content-Type': 'multipart/form-data' }
      })
    .then((data) => {
        if(data.status === 200){
            const error = data.data.error;
            if(error){
              return {error : {type : 'error', message : `File is not of supported type (.pdf, .jpg, .png, .docx)`}}
            }console.log('DATA', data.data);
            return data.data;
        }else{
            return {type : 'error', message : `There was a server error with a status code of ${data.status}`}
        }
    });
};

export { sendRedeemCode, sendProof, checkParamAgainstCode }