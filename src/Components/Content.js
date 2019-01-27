// REACT
import React from 'react';
// LIBRARIES
import axios from 'axios';
import history from '~/common/history';
import { MdSentimentDissatisfied } from 'react-icons/lib/md';

// COMPONENT
// Error boundary - if an error occurs in the main content, this will prevent
// the entire app from crashing and will display an error message.
class ContentBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = { hasError: false, errorMessage : null}
    }

    // I think this trips if the component malfunctions
    componentDidCatch(error, info){
        this.setState({ hasError: true });
        // Add error logging service here
    }

    componentDidMount(){
        
        this.requestInterceptor = axios.interceptors.request.use(function(config){
            // Do something before request is sent
            console.log('REQUEST (in INT) - ', config);
            return config;
        }, function (error) {
            console.log('NO REQUEST MADE (IN INT) - ', error);
            this.setState({ hasError: true, errorMessage : `No Request was made!` });
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.responseInterceptor = axios.interceptors.response.use(function (response) {
            // Do something with response data
            console.log('RESPONSE (in INT) - ', response);
            return response;
        }, (error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('ERROR - response data -',error.response.data);
                console.log('ERROR - response status -', error.response.status);
                console.log('ERROR - response header -', error.response.headers);
                if(error.response.status === 403){
                    history.push(`${APP_ROOT}login`);
                }else{
                    this.setState({ hasError: true, errorMessage : `There was an error with the status ${error.response.status} - ${error.response.data}`});
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('ERROR - request made, no response');
                this.setState({ hasError: true, errorMessage : `There was no response from the server!`});
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('ERROR - occurred in setting up request -', error.message);
                this.setState({ hasError: true, errorMessage : `an error occurred in setting up request` });
            }

            // Do something with response error
            return Promise.reject(error);
        });

    }

    componentWillUnmount(){
        // Remove handlers, so Garbage Collector will get rid of if WrappedComponent will be removed 
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
    }


    render(){
        if(this.state.hasError){
            
            // Hide error after three seconds
            // setTimeout(()=>{
            //     this.setState({hasError : false, errorMessage : null});
            // },3000);
              
            return (
                <div className="error-wrapper">
                    <section className="error-section">
                        <div className="notification notification-error">
                            <strong>ERROR : </strong> <span>{ this.state.errorMessage }</span>
                        </div>
                        <div className="error-image">
                            <MdSentimentDissatisfied />
                        </div>
                    </section>
                </div>
            )
                
     
            
        }
        return this.props.children;
    }
}


// COMPONENT
// Displays app content between header and footer depending on the route
const Content = (props) =>{
    return (
        <ContentBoundary>
            <div className="route-wrapper">{props.children}</div>
        </ContentBoundary>
    )
}

export default Content;