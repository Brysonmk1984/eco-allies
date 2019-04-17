// REACT
import React from 'react';
import { connect } from 'react-redux';
// LIBRARIES
import axios from 'axios';
import history from '~/common/history';
import { MdClose } from 'react-icons/lib/md';
// ACTIONS
import { setAlert, clearAlert, clearAllAlerts } from '../actions/index.js';

// COMPONENT
// Error boundary - if an error occurs in the main content, this will prevent
// the entire app from crashing and will display an error message.
class ContentBoundary extends React.Component{
    
    renderAlerts(){
        const alertEls = this.props.alerts.map((a, i)=>{
            return <div key={`alert-${i}`} className={`notification ${a.type === 'error' ? 'notification-error' : a.type === 'success' ? 'notification-success' : a.type === 'loading' ? 'notification-loading' : a.type === 'actionRequired' ? 'notification-action-required' : null}`}>
                <strong> {a.type === 'error' ? 'ERROR' : a.type === 'success' ? 'Success!' : a.type === 'loading' ? 'One moment please' : a.type === 'actionRequired' ? 'Action Required' : null} : </strong> <span> { a.message }</span> <span className={`close-alert`} onClick={this.props.clearAlert.bind(this, i)}><MdClose /></span>
            </div>
        });

        return <div id="alertWrapper" key="alert-wrapper" className="alert-wrapper">
            <section key="alert-section" className="alert-section">
                {[...alertEls]}
            </section>
        </div>
    }

    // I think this trips if the component malfunctions
    componentDidCatch(error, info){
        this.props.setAlert({type : 'error', message : 'Component Rendering Error'});
        // Add error logging service here
    }

    componentDidMount(){
        
        this.requestInterceptor = axios.interceptors.request.use(function(config){
            // Do something before request is sent
            console.log('REQUEST (in INT) - ', config);
            return config;
        }, function (error) {
            console.log('NO REQUEST MADE (IN INT) - ', error);
            this.props.setAlert({type : 'error', message : 'No Request was made!'});
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
                    this.props.setAlert({type : 'error', message : `There was an error with the status ${error.response.status} - ${error.response.data}`});
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('ERROR - request made, no response');
                this.props.setAlert({type : 'error', message : 'There was no response from the server!'});
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('ERROR - occurred in setting up request -', error.message);
                this.props.setAlert({type : 'error', message : 'an error occurred in setting up request'});
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
        if(this.props.alerts.length){
            
            return [
                // uncomment this after database fix
                //this.renderAlerts(),
                this.props.children
            ]
                
        }
        return this.props.children;
    }
}


// COMPONENT
// Displays app content between header and footer depending on the route
const Content = (props) =>{
    return (
        <ContentBoundary {...props}>
            <div className="route-wrapper">{props.children}</div>
        </ContentBoundary>
    )
}

function mapStateToProps(state){
    return {
      alerts : state.alerts,
      allies : state.allies,
      account : state.account
    }
  }

  const mapDispatchToProps = {
    setAlert,
    clearAlert,
    clearAllAlerts
  };

export default connect(mapStateToProps, mapDispatchToProps)(Content);