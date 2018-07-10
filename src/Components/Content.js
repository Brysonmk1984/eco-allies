import React from 'react';
import { Route } from 'react-router-dom';
import About from './About/About';
import Gallery from './Gallery/Gallery';
import UserCollection from './UserCollection/UserCollection';

class Content extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="route-wrapper">
                {/* <Route exact path="/" component={() => (<UserCollection allies={this.props.allies}  buildAlly={this.props.buildAlly}  transferAlly={this.props.transferAlly} /> )}  /> */}
                <Route exact path="/" component={() => (<Gallery   /> )}  />
                <Route path="/about" component={About} />
                <Route path="/gallery" component={() => (<Gallery allies ={this.props.allies}  /> )} />
                <Route path="/user-collection" component={() => (<UserCollection allies ={this.props.allies}  buildAlly={this.props.buildAlly}  transferAlly={this.props.transferAlly} getAlliesOfUser={this.props.getAlliesOfUser} /> )}  />
                {/* <Route path="faq" component={Faq} />
                <Route path="gettingStarted" component={GettingStarted} /> */}
            </div>
        );
    }
}

export default Content;