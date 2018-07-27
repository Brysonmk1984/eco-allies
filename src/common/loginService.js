import axios from 'axios';

const login = function(formData){
    return axios.post('http://localhost:3001/login',formData)
    .then((data) => {
        console.log('in then!', data);
        if(data.status === 200){
            return data.data;
        }else{
            return {type : 'Server Error', message : `There was a server error with a status code of ${data.status}`}
        }
    }).catch((error) => {
        return {type : 'AJAX Error', message : `${error}`}
    })
};

const register = function(formData){
    return axios.post('http://localhost:3001/register',formData)
    .then((data) => {
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
        return {type : 'AJAX Error', message : `${error}`}
    })
};

export { login, register }