import React from 'react';
import { Route } from 'react-router-dom';
import Trade from './Trade/Trade';
import About from './About/About';

class Content extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="route-wrapper">
                <Route exact path="/" component={() => (<Trade allies ={this.props.allies}  buildAlly={this.props.buildAlly} /> )}  />
                <Route path="/about" component={About} />
                <Route path="/trade" component={Trade} allies={this.props.allies} buildAlly={this.props.buildAlly} />
                {/* <Route path="faq" component={Faq} />
                <Route path="gettingStarted" component={GettingStarted} /> */}
            </div>
        );
    }
}

export default Content;