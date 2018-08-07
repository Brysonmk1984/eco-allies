import React from 'react';
import { MdFace } from 'react-icons/lib/md';

import './account.scss';

export default class Account extends React.Component{
    constructor(){
        super();
        this.state = {
            account : {}
        }
    }

    renderAllyData(){
        return this.props.appState.allies.map((ally, i)=>{
            return <li className="ally-data" key={i}>
                <strong className="ally-label">ID: </strong>
                <span className="ally-value">{ ally.id }</span>
                <strong className="ally-label">DNA: </strong>
                <span className="ally-value">{ ally.dna }</span>
            </li>
        });
    }

    componentDidMount(){
       this.props.getAccountDetails()
       .then((data) =>{
            if(data.data){
                const { email, publicEthKey, username } = data.data;
                this.setState(()=>({ email, publicEthKey, username}));
            }
       });


    }

    render(){
        //console.log('APPSTATE', this.props.appState);
        //console.log('COMPSTATE', this.state.account);
        return(
            <div className="page-wrapper account-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1><MdFace /></h1>
                        <p>{this.state.username}</p>
                    </div>
                </section>
                <section className="details-section">
                    <div className="subsection">
                        <h2>Account Details</h2>
                    </div>
                    <div className="subsection subsection-account">
                        <div>
                            <span>Email: </span>
                            <strong>{ this.state.email }</strong>
                        </div>
                        <div>
                            <span>Public Key: </span>
                            <strong>{ this.state.publicEthKey }</strong>
                        </div>
                    </div>
                    <div className="subsection">
                        <h2>Your Allies</h2>
                    </div>
                    <div className="subsection subsection-allies">
                        <ul>
                            { this.renderAllyData() }
                        </ul>
                    </div>
                    {/* <div className="subsection">
                        <h2>Account Actions</h2>
                    </div> */}
          
                </section>
                <section className="bottom-section">
                </section>
            </div>
        );
    }
}