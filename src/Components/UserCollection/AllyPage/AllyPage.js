import React from 'react';
import { Link } from 'react-router-dom';
import AllyMenu from '../AllyMenu';
import VariantBar from '../VariantBar';
import TransferModal from '../TransferModal';
import { decodeAlly } from '~/common/crackDna';
import fist from '~/assets/images/fist.png';

export default class AllyPage extends React.Component{
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
    toggleModal(id){console.log('id', id);
        this.child.toggleModal(id);
    }
    getAllyColor(){
        if(this.state.allyColor){
            return <li> {this.state.allyColor} Variant </li> 
        }
    }

    componentDidMount(){
        const ally = decodeAlly(this.props.match.params.allyDna);

        this.setState(() =>({allyName : ally.basics.character, allyDescription : ally.basics.description, allySkills:ally.skills,allyImage:ally.image,allyId : this.props.location.state.allyId, allySign:ally.sign, allyAlignment:ally.alignment, allyColor:ally.color, allyPower:ally.power}));
    }

    render(){
        return(
            <div className="ally-page">
                <div className="ally-actions">
                    <AllyMenu anchorEl={this.state.anchorEl} toggleModal={() => {this.toggleModal(this.state.allyId)}} />
                </div>
                <div className="ally-title">
                    <h3>{this.state.allyName}</h3>
                    <h4>{ this.state.allyDescription }</h4>
                </div>
                <VariantBar color={this.state.allyColor} alignment={this.state.allyAlignment} sign={this.state.allySign} />
                <div className="ally-image">
                    <Link to={ `/user-collection/${this.props.dna}` }>
                        <img src={ `/${this.state.allyImage}` } />
                    </Link>
                </div>
                <div className="ally-skills">
                    <ul>
                        { this.state.allySkills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                    </ul>
                </div>
                
                <div className="ally-power">
                        <img className="fist" src={fist} /> <strong>{this.state.allyPower}</strong>
                </div>
                <TransferModal onRef={ref => (this.child = ref)} toggleModal={this.toggleModal.bind(this)} transferAlly={this.props.transferAlly} />
            </div>
        );
    }
}