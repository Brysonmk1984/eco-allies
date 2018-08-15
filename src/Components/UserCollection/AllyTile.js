// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import VariantBar from './VariantBar';
// COMMON
import history from '~/common/history';
import { decodeAlly } from '~/common/crackDna';
import * as AllyImages from '~/common/includedImages';
import { lowercaseUnderscore } from '~/common/helperFunctions';
// ASSETS
import fist from '~/assets/images/fist.png';

// COMPONENT
export default class AllyTile extends React.Component{
    constructor(){
        super();
        this.state = {
            allyName : '',
            allyDescription : '',
            allySkills : [],
            allyImage : '',
            allyId : null,
            allySign : '',
            allyAlignment : '',
            allyColor : null,
            allyPower : 0
        }
    }

    // Navigate user to specific ally page on click, passing the allyId as an additional variable
    navigateToAlly(){
        history.push({
            pathname: `${APP_ROOT}user-collection/${this.props.dna}`,
            state: {
                allyId : this.props.id
            }
        });
    }

    // When component mounts, decode ally information from the specific DNA passed in as a prop
    // Then set state to fully decoded ally data
    componentDidMount(){
        const ally = decodeAlly(this.props.dna);
        this.setState(() =>({allyName : ally.basics.character, allyDescription : ally.basics.description, allySkills:ally.skills,allyImage:ally.image, allyId : this.props.id, allySign:ally.sign, allyAlignment:ally.alignment, allyColor:ally.color, allyPower:ally.power}));
    }
    
    render(){
        return(
            <aside className="ally">
                <div className="ally-title">
                    <h3>{this.state.allyName}</h3>
                    <h4>{ this.state.allyDescription }</h4>
                </div>
                <VariantBar color={this.state.allyColor} alignment={this.state.allyAlignment} sign={this.state.allySign} />
                <div className="ally-image">
                    <img src={ this.state.allyImage } onClick={this.navigateToAlly.bind(this)} />
                </div>
                <div className="ally-skills">
                    <ul>
                        { this.state.allySkills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                    </ul>
                </div>
                <div className="ally-power">
                    <img className="fist" src={fist} /> <strong>{this.state.allyPower}</strong>
                </div>
            </aside>
        );
    }
}

// PROP-TYPES
AllyTile.propTypes = {
    dna : PropTypes.string.isRequired,
    id : PropTypes.number.isRequired,
};