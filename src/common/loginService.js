import axios from 'axios';
const endpoint = process.env.NODE_ENV === 'production' ?  'https://eco-allies.herokuapp.com/' : 'http://localhost:3001/';
//const endpoint = 'https://eco-allies.herokuapp.com/';
const login = function(formData){

    return axios.post(`${endpoint}users/login`,{email: formData.email, password: formData.password}, {withCredentials:true})
    .then((data) => {console.log('data', data);
        if(data.status === 200){
            const errorObj = data.data.error;
            if(errorObj){
                return {
                    error : errorObj.errors.map((error)=>{
                        return {error : {type : 'error', message : `${error.type} at ${error.path} input`}}
                    })
                }
            }
            return data.data;
        }else{
            return {type : 'error', message : `There was a server error with a status code of ${data.status}`}
        }
    });
};

const register = function(formData){
    return axios.post(`${endpoint}users/register`,formData)
    .then((data) => {console.log('data!', data);
        if(data.status === 200){
            const errorObj = data.data.error;
            if(errorObj){
                return {
                    error : errorObj.errors.map((error)=>{
                        return {error : {type : 'error', message : `${error.type} at ${error.path} input`}}
                    })
                }
            }console.log('EP', endpoint, data.data);
            return data.data;
        }else{
            return {type : 'error', message : `There was a server error with a status code of ${data.status}`}
        }
    }).catch((error) => {
        return {type : 'error', message : `${error}`}
    })
};

const logout = function(){
    return axios.get(`${endpoint}users/logout`, {withCredentials:true})
    .then((data) => {console.log('in lo', data);
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
    }).catch((error) => {console.log('ERRs', error);
        return { error : [{type : 'AJAX Error', message : `Couldn't communicate with server to log out!`}] }
    })
};

const loggedIn = function(){
    return axios.get(`${endpoint}users/logged-in`, {withCredentials:true})
    .then((data) => {
        console.log('LI data', data);
        return data;
    });
};

const loggedInUsingLS = function(user){
    return axios.post(`${endpoint}users/logged-in`, { user }, {withCredentials:true})
    .then((data) => {
        console.log('LILS data', data);
        return data;
    });
};

export { login, register, logout, loggedIn, loggedInUsingLS }