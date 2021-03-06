import axios from 'axios';
const endpoint = process.env.NODE_ENV === 'production' ?  'https://eco-allies.herokuapp.com/' : 'http://localhost:3001/';

const sendEmail = function(formData){
  console.log('FD', formData);
  return axios.post( `${endpoint}users/contact`, formData, {withCredentials:true})
  .then((data) =>{
    console.log('THE DATA',data);
    if(data.status === 200){
        return data.data;
    }else{
        return {error : [{type : 'error', message : `There was a server error with a status code of ${data.status}`}]}
    }
  })
  .catch((error)=>{
    return { error : [{type : 'error', message : `Couldn't deliver email...`}] }
  });
}

export { sendEmail };