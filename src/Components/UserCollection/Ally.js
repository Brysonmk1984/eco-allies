import React from 'react';
import AllyMenu from './AllyMenu';
import VariantBar from './VariantBar';
import { decodeAlly } from '~/common/crackDna';

import fist from '~/assets/images/fist.png';

export default class Ally extends React.Component{
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

    componentDidMount(){
        const ally = decodeAlly(this.props.dna);
        console.log('ALLY',ally);

        this.setState(() =>({allyName : ally.basics.character, allyDescription : ally.basics.description, allySkills:ally.skills,allyImage:ally.image,id : this.props.id, allySign:ally.sign, allyAlignment:ally.alignment, allyColor:ally.color, allyPower:ally.power}));
    }
    
    render(){
        return(
            <aside className="ally">
                <div className="ally-title">
                    <h3>{this.state.allyName}</h3>
                    <h4>{ this.state.allyDescription }</h4>
                </div>
                <div className="ally-actions">
                    <AllyMenu anchorEl={this.state.anchorEl} toggleModal={() =>{ this.props.toggleModal(this.state.allyId); }} />
                </div>
                <VariantBar />
                <div className="ally-image">
                    <img src={ this.state.allyImage } />
                </div>
                <div className="ally-skills">
                    <ul>
                        { this.state.allySkills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                    </ul>
                </div>
                <div className="ally-mods">
                    <ul>
                        <li>{ this.state.allyAlignment }</li>
                        <li>{ this.state.allySign }</li>
                        { this.getAllyColor() }
                    </ul>
                </div>
                <div className="ally-power">
                    <img className="fist" src={fist} /> <strong>{this.state.allyPower}</strong>
                </div>
            </aside>
        );
    }
}