import axios from 'axios';

const login = function(formData){
    return axios.post('http://localhost:3001/login',{email: formData.email, password: formData.password}, {withCredentials:true})
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

const logout = function(){
    // const getCookie = (name) => {
    //     return document.cookie.split('; ').reduce((r, v) => {
    //       const parts = v.split('=')
    //       return parts[0] === name ? decodeURIComponent(parts[1]) : r
    //     }, '')
    //   }


    return axios.get('http://localhost:3001/logout', {withCredentials:true})
    .then((data) => {console.log('in lo');
        if(data.status === 200){
            //console.log(data,'cookie-', getCookie('brysonsession'));
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
        return { error : [{type : 'AJAX Error', message : `Couldn't communicate with server to log out!`}] }
    })
};

const loggedIn = function(){
    return axios.get('http://localhost:3001/logged-in', {withCredentials:true})
    .then((data) => {
        console.log('LI data', data);
        return data;
    })
    .catch((error)=>{
        console.log('li error', error);
    });
};

export { login, register, logout, loggedIn }