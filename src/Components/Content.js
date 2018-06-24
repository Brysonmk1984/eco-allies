import React from 'react';
import { Route } from 'react-router-dom';
import Trade from './Trade/Trade';
import About from './About/About';

class Content extends React.Component{
    render(){
        return(
            <div className="route-wrapper">
                <Route exact path="/" component={Trade} />
                <Route path="/about" component={About} />
                <Route path="/trade" component={Trade} />
                {/* <Route path="faq" component={Faq} />
                <Route path="gettingStarted" component={GettingStarted} /> */}
            </div>
        );
    }
}

export default Content;