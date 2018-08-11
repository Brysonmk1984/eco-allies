import React from 'react';
import { Link } from 'react-router-dom';
import VariantBar from './VariantBar';
import history from '~/common/history';
import { decodeAlly } from '~/common/crackDna';

import fist from '~/assets/images/fist.png';

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
    getAllyColor(){
        if(this.state.allyColor){
            return <li> {this.state.allyColor} Variant </li> 
        }
    }
    navigateToAlly(){
        history.push({
            pathname: `/user-collection/${this.props.dna}`,
            state: {
                allyId : this.props.id
            }
        });
    }

    componentDidMount(){
        const ally = decodeAlly(this.props.dna);
        //console.log('ALLY',ally.color);

        this.setState(() =>({allyName : ally.basics.character, allyDescription : ally.basics.description, allySkills:ally.skills,allyImage:ally.image,allyId : this.props.id, allySign:ally.sign, allyAlignment:ally.alignment, allyColor:ally.color, allyPower:ally.power}));
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