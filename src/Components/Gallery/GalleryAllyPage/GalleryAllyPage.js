// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMMON
import allyList from '~/common/allyList.json';
import * as AllyImages from '~/common/includedImages';
import { lowercaseUnderscore } from '~/common/helperFunctions';
// ASSETS

// COMPONENT
export default class GalleryAllyPage extends React.Component{
    constructor(){
        super();
        this.state = {
            allyName : '',
            allyDescription : '',
            allyImage : '',
            allySkills : [],
            allyHistory : ''
        }
    }

    // On component mount, decode the ally from allylist.json with input of param passed 
    // and update the state with the new info 
    componentDidMount(){
        const ally = allyList.find((a)=>{
            return a.character === this.props.location.state.allyCharacter;
        });
        this.setState(() =>({allyName : ally.character, allySkills : ally.skills, allyHistory : ally.history, allyDescription : ally.description, allyImage:`${AllyImages[lowercaseUnderscore(ally.character)]}`}));
    }

    render(){
        return(
            <div className="ally-page">
                <div className="ally-title">
                    <h3>{this.state.allyName}</h3>
                    <h4>{ this.state.allyDescription }</h4>
                </div>
                <div className="ally-image">
                    <img src={ `${this.state.allyImage}` } />
                </div>
                <div className="ally-skills">
                    <ul>
                        { this.state.allySkills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                    </ul>
                </div>
                <div className="ally-history">
                    <p>
                        { this.state.allyHistory }
                    </p>
                </div>
            </div>
        );
    }
   
};

// PROP-TYPES
GalleryAllyPage.propTypes = {
    // history api
    history : PropTypes.object.isRequired,
    location : PropTypes.shape({
        hash : PropTypes.string,
        key : PropTypes.string,
        search : PropTypes.string,
        pathname : PropTypes.string.isRequired,
        state : PropTypes.shape({
            allyCharacter : PropTypes.string.isRequired
        })
    }),
    match : PropTypes.shape({
        isExact : PropTypes.bool.isRequired,
        params : PropTypes.shape({
            allyCharacter : PropTypes.string.isRequired
        }),
        path : PropTypes.string.isRequired,
        url : PropTypes.string.isRequired
    }),
    staticContext : PropTypes.object
};