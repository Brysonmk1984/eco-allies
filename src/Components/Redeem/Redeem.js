// REACT
import React from 'react';
import { Link } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// ASSETS
import './redeem.scss';


// COMPONENT
const Redeem = function(props){
    return(
        <div className="page-wrapper form-page redeem-page">
            <section className="form-section">
                <div className="subsection">
                    <h2>Unlock your Ally</h2>
                    <p>Codes are aquired by <Link  to={`${APP_ROOT}proof`} >sending proof</Link> of your own positive impact</p>
                </div>
                <form id="redeemForm" onSubmit={props.handleSubmit}>
                    <div className="input_container">
                    <label id="codeLabel">
                        <strong>Code:</strong>
                        <input id="codeInput" name="code" type="text" value={props.code} onChange={props.handleChange} placeholder="Nine-Digit Code" minLength="9" maxLength="9" required />
                    </label>
                    </div>
                    <div className="input_container">
                        <label>
                        <input id="confirmCheck" name="confirmed" type="checkbox" checked={props.confirmed}  onChange={props.handleCheckboxToggle} required />
                        <strong>  I understand the code and ally will be associated with my account.</strong>
                        </label>
                    </div>
                    <Button type="submit" className="btn btn-primary btn-block">
                    submit
                    </Button>
                </form>
            </section>
        </div>
    );
}

export default Redeem;

// PROP-TYPES
Redeem.propTypes = {
    account : PropTypes.shape({
        publicEthKey : PropTypes.string,
        email : PropTypes.string.isRequired,
        fullAccount : PropTypes.bool,
        loggedIn : PropTypes.bool
    }),
    code : PropTypes.string,
    confirmed : PropTypes.bool.isRequired
};