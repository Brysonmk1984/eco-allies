// REACT
import React from 'react';
import { connect } from 'react-redux';
// LIBRARIES
import PropTypes from 'prop-types';
import { MdFace } from 'react-icons/lib/md';
// COMMON
import { decodeAlly } from '~/common/crackDna';
// ASSETS
import './account.scss';



// COMPONENT
const Account = (props) =>{
    function renderAllyData(){
        // Generates list items for each ally passed in from App State via props
        return props.allies.map((ally, i)=>{
            const decodedAlly = decodeAlly(ally.dna);
            const variant =  decodedAlly.color ? ` (${decodedAlly.color} Variant)` : null;
            
            return <li className="ally-data" key={i}>
                <strong className="ally-label">ID: </strong>
                <span className="ally-value">{ ally.id }</span>
                <strong className="ally-label">DNA: </strong>
                <span className="ally-value">{ ally.dna }</span>
                <strong>Ally:</strong>
                <span>{decodedAlly.basics.character} {variant}</span>
                
            </li>
        });

    }

    return(
        <div className="page-wrapper account-page">
            <section className="title-section">
                <div className="subsection">
                    <h1><MdFace /></h1>
                    <p>{props.account.username}</p>
                </div>
            </section>
            <section className="details-section">
                <div className="subsection">
                    <h2>Account Details</h2>
                </div>
                <div className="subsection subsection-account">
                    <div>
                        <span>Email: </span>
                        <strong>{ props.account.email }</strong>
                    </div>
                    <div>
                        <span>Public Key: </span>
                        <strong>{ props.account.publicEthKey }</strong>
                    </div>
                </div>
                <div className="subsection">
                    <h2>Your Allies</h2>
                </div>
                <div className="subsection subsection-allies">
                    <ul>
                        { renderAllyData() }
                    </ul>
                </div>
            </section>
        </div>
    );
} 

export default Account;

// PROP-TYPES
Account.propTypes = {
    allies : PropTypes.array.isRequired,
    account : PropTypes.shape({
        publicEthKey : PropTypes.string.isRequired,
        email : PropTypes.string.isRequired,
        fullAccount : PropTypes.bool.isRequired,
        loggedIn : PropTypes.bool.isRequired
    })
};