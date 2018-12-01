// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import VariantBar from '../VariantBar';
// COMMON
import history from '~/common/history';
import { decodeAlly } from '~/common/crackDna';
import * as AllyImages from '~/common/includedImages';
import { lowercaseDash } from '~/common/helperFunctions';
// ASSETS
import './allyTile.scss';
import fist from '~/assets/images/fist.png';
import bgAmethyst from '~/assets/images/backgrounds/amethyst_bg.png';
import bgCitrine from '~/assets/images/backgrounds/citrine_bg.png';
import bgDiamond from '~/assets/images/backgrounds/diamond_bg.png';
import bgEmerald from '~/assets/images/backgrounds/emerald_bg.png';
import bg_fire_opal from '~/assets/images/backgrounds/fire_opal_bg.png';
import bgOnyx from '~/assets/images/backgrounds/onyx_bg.png';
import bgRuby from '~/assets/images/backgrounds/ruby_bg.png';
import bgSapphire from '~/assets/images/backgrounds/sapphire_bg.png';
import bgTopaz from '~/assets/images/backgrounds/topaz_bg.png';

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

    determineBackground(color){
        if(color !== null){
            return `bg bg-${lowercaseDash(color)}`;
        }
        return ''; 
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
                <div className={`ally-image`}>
                    <img className={`${this.determineBackground(this.state.allyColor)}`} src={ this.state.allyImage } onClick={this.navigateToAlly.bind(this)} />
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