import React from 'react';
import { Route } from 'react-router-dom';
import Trade from './Trade';
import About from './About';

class Content extends React.Component{
    render(){
        return(
            <section>
                <Route exact path="/" component={About} />
                <Route path="/about" component={About} />
                <Route path="/trade" component={Trade} />
                {/* <Route path="faq" component={Faq} />
                <Route path="gettingStarted" component={GettingStarted} /> */}
            </section>
        );
    }
}

export default Content;