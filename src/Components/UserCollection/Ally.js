import React from 'react';
import AllyMenu from './AllyMenu';
import { determineAlly, determineSkills, determineImage, determineSign } from '~/common/crackDna';


export default class Ally extends React.Component{
    constructor(){
        super();
        this.state = {
            ally : '',
            allySkills : [],
            allyImage : '',
            allyId : null,
            allySign : ''
        }
    }

    componentDidMount(){
        const ally = determineAlly(this.props.dna);
        const allySkills = determineSkills(this.props.dna, ally.character);
        const allyImage = determineImage(this.props.dna, ally);
        const allyId = this.props.id;
        const allySign = determineSign(this.props.dna);
        this.setState(() =>({ally,allySkills,allyImage,allyId, allySign}));
    }
    
    render(){
        return(
            <aside className="ally">
                <div className="ally-title">
                    <h3>{this.state.ally.character}</h3>
                    <h4>{ this.state.ally.character }</h4>
                </div>
                <div className="ally-actions">
                    <AllyMenu anchorEl={this.state.anchorEl} toggleModal={() =>{ this.props.toggleModal(this.state.allyId); }} />
                </div>
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
                        <li>Alignment</li>
                        <li>{ this.state.allySign }</li>
                        <li>Color Adjustment</li>
                        <li>Novelty</li>
                    </ul>
                </div>
            </aside>
        );
    }
}