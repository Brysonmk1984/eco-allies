import React from 'react';
import { accountDetails } from '~/common/loginService';
import './account.scss';

export default class Account extends React.Component{
    constructor(){
        super();
        console.log('!!',super.readAllies);
    }
    componentDidMount(){
       accountDetails()
       .then((data) =>{
            console.log('ACCOUNT DATA', data);
       });

       //this.props.initWeb3();
    }

    render(){
        return(
            <div className="page-wrapper account-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>Account</h1>
                        <p>insert email here</p>
                    </div>
                </section>
                <section className="details-section">
                    <div className="subsection">
                        <h2>Account Details</h2>
                    </div>
                    <div className="subsection">
                        <p>An Eco Ally is a unique collectable that cannot be replicated, taken away, or destroyed. They fight for our real life environment through actions you take, such as using a reusable grocery bag. It’s through this collective effort that we will help out Eco Allies defend our home, Gaea.</p>
                    </div>
                </section>
                <section className="bottom-section">
                </section>
            </div>
        );
    }
}