import axios from 'axios';
const endpoint = process.env.NODE_ENV === 'production' ?  'https://eco-allies.herokuapp.com/' : 'http://localhost:3001/';
//const endpoint = process.env.NODE_ENV === 'production' ?  'https://eco-allies.herokuapp.com/' : 'https://eco-allies.herokuapp.com/';
const redeem = function(code){
    console.log('code');
    return axios.post(`${endpoint}tokens/code`,{code: code}, {withCredentials:true})
    .then((data) => {console.log('data', data);
        if(data.status === 200){
            const errorObj = data.data.error;
            if(errorObj){
                return {
                    error : errorObj.errors.map((error)=>{
                        return {error : {type : 'Database Error', message : `${error.type} at ${error.path} input`}}
                    })
                }
            }
            return data.data;
        }else{
            return {type : 'Server Error', message : `There was a server error with a status code of ${data.status}`}
        }
    }).catch((error) => {
        return { error : [{type : 'AJAX Error', message : `Email or password did not match our records!`}] }
    })
};

export { redeem }